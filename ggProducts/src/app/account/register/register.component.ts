import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';

import { AlertController, ToastController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { AuthResponse } from 'src/app/model/account-model';
import { HelpComponent } from 'src/app/shared/help/help.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off-outline';
  userDetails: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private sharedServ: SharedService
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }


  onSubmit() {
    if (this.regForm.invalid) {
      this.presentAlert('Try again!');
      return;
    }
    this.userDetails = Object.assign(this.userDetails, this.regForm.value);
    const deviceStatus: boolean = navigator.onLine;
    if (deviceStatus === true) {
      this.accountServ.registerUser(this.userDetails.firstname, this.userDetails.lastname,
        this.userDetails.email, this.userDetails.password).
        pipe(
          map((res: AuthResponse) => {
            console.log(res);
            if (res.status === 'Success') {
              this.accountServ.setCurrentUser(res.data);
              this.presentToast('Registration Successful!', 'success');
              this.router.navigate(['../home']);
              return;
            }
          }),
          catchError((err) => {
            if (err.status === 504) {
              this.presentToast('An error has occured, Please Try again, ', 'danger');
              console.error('504', err.status);
              throw (err);
            }
            this.presentToast('Email already exists! Try again', 'danger');
            throw (err);
          }
          )).subscribe();
    } else {
      this.presentToast('You\'re offline! Check your Internet connection.', 'danger');
    }
    this.regForm.reset();
  }

  async openHelp() {
    this.sharedServ.openModal(HelpComponent);
  }

  async presentAlert(alertMessage) {
    const alert = await this.alertController.create({
      header: 'ALERT',
      subHeader: 'Data Invalid!',
      message: alertMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(messageIn: string, colorIn: string) {
    const toast = await this.toastController.create({
      message: messageIn,
      duration: 2000,
      position: 'top',
      color: colorIn
    });
    await toast.present();
  }

}


