
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthResponse } from 'src/app/model/account-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off-outline';

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['test7@123.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['000000', [Validators.required, Validators.minLength(6)]]
    });

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.presentAlert('Try Again');
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const deviceStatus: boolean = navigator.onLine;

    if (deviceStatus === true) {
      this.accountServ.login(email, password).subscribe((res: AuthResponse) => {
        console.log('Status' + res.status);

        if (res.status === 'Success') {
          this.accountServ.setCurrentUser(res.data);
          this.router.navigate(['../home']);
          return;
        }
        if (res.message === 'Invalid Email') {
          this.presentAlert('Email does not exist! Try again');
          return;
        }
        else if (res.message === 'Invalid Password') {
          this.presentAlert('Password Incorrect! Try again');
          return;
        }
        else if (res.message === 'Both Email and Password are Invalid') {
          this.presentAlert('Sorry Invalid details, Try Registering');
          return;
        }
      });

    } else {
      this.presentToast('You\'re offline! Check your Internet connection.', 'danger');
    }

    this.loginForm.reset();
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

















