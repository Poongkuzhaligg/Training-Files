import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
// import { BackendAccountService } from 'src/app/services/backendAccount.service';
import { User } from 'src/app/model/user';
import { AuthResponse } from 'src/app/model/account-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  currentUser: User;
  passwordoldType = 'password';
  passwordnewType = 'password';
  passwordType = 'password';
  passwordOldIcon = 'eye-off-outline';
  passwordNewIcon = 'eye-off-outline';
  passwordIcon = 'eye-off-outline';

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  async ngOnInit() {
    this.menuCtrl.close();
    this.currentUser = await this.accountServ.loggedUser();
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  hideShowOldPassword() {
    this.passwordoldType = this.passwordoldType === 'text' ? 'password' : 'text';
    this.passwordOldIcon = this.passwordOldIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }
  hideShowNewPassword() {
    this.passwordnewType = this.passwordnewType === 'text' ? 'password' : 'text';
    this.passwordNewIcon = this.passwordNewIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';

  }

  checkPasswords(group: FormGroup) {
    // console.log(group.controls?.confirmPassword?.errors);
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.presentAlert();
      return;
    }
    const username = this.editForm.value.username;
    const password = this.editForm.value.confirmPassword;
    const deviceStatus: boolean = navigator.onLine;

    if (deviceStatus === true) {
      (this.accountServ.editForm(username, password)).subscribe((res: AuthResponse) => {
        console.log(res);
        if (res.status === 'Success') {
          this.accountServ.setCurrentUser(res.data);
          this.router.navigate(['../home']);
          this.presentToast('Profile updated successfully!', 'light');
        }
        else {
          this.presentToast('Sorry, Try again!', 'danger');
        }
      });
    } else {
      this.presentToast('You\'re offline! Check your Internet connection.', 'danger');
    }
    this.editForm.reset();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ALERT',
      subHeader: 'Data Invalid!',
      message: 'Try again',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(toastMsg, toastColor) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 1500,
      position: 'top',
      color: toastColor
    });
    await toast.present();
  }

}
