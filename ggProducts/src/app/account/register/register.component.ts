import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthResponse } from 'src/app/model/account-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  userDetails: User = {
    userid: 0,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.presentAlert('Try again!');
      return;
    }
    this.userDetails = Object.assign(this.userDetails, this.regForm.value);
    const deviceStatus: boolean = navigator.onLine;
    if (deviceStatus === true) {
      this.accountServ.registerUser(this.userDetails).subscribe((res) => {
        console.log(res);
        console.log('Status' + res.status);
        if (res.Status === 'Success') {
          this.accountServ.setCurrentUser(this.userDetails);
          this.router.navigate(['../home']);
          this.presentToast('Registration Successful!', 'success');
          return;
        }
        if (res.Status === 'Failed') {
          this.presentAlert('Email already exists! Try again');
          return;
        }
      });
    } else {
      this.presentToast('You\'re offline! Check your Internet connection.', 'danger');
    }
    this.regForm.reset();
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

