
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthResponse } from 'src/app/model/account-model';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { HelpComponent } from 'src/app/shared/help/help.component';

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
    private sharedServ: SharedService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['jim@kim.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['jimkim', [Validators.required, Validators.minLength(6)]]
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
      this.accountServ.login(email, password).
        pipe(
          map((res: AuthResponse) => {
            console.log(res);
            if (res.status === 'Success') {
              this.accountServ.setCurrentUser(res.data);
              this.router.navigate(['/home']);
              return;
            }
          }),
          catchError((err) => {
            if (err.status === 504) {
              this.presentToast('An error has occured, Please Try again, ', 'danger');
              console.error('504', err.status);
              throw (err);
            }
            this.presentToast('Sorry Invalid details, Try Registering', 'danger');
            throw (err);
          }
          )).subscribe();
    } else {
      this.presentToast('You\'re offline! Check your Internet connection.', 'danger');
    }

    this.loginForm.reset();
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
      cssClass: 'toast',
      position: 'top',
      color: colorIn
    });
    await toast.present();
  }


}

















