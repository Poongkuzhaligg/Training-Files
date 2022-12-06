import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { APP_PAGE_TITLE, ShowPassword } from 'src/app/config/constants';
import { ALERT_MESSAGE, FormLabelName, SaveBtn, TOAST_MESSAGE, VALIDATION_TEXT } from 'src/app/config/storage-key';
import { ApiStatus, AuthResponse } from 'src/app/model/account-model';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  pageTitle = APP_PAGE_TITLE;
  formLabel = FormLabelName;
  validationText = VALIDATION_TEXT;
  saveBtn = SaveBtn;
  changeForm: FormGroup;
  currentUser: User;
  passwordoldType = ShowPassword.typePassword;
  passwordnewType = ShowPassword.typePassword;
  passwordType = ShowPassword.typePassword;
  passwordOldIcon = ShowPassword.eyeOff;
  passwordNewIcon = ShowPassword.eyeOff;
  passwordIcon = ShowPassword.eyeOff;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.currentUser = await this.accountService.loggedUser();
    this.changeForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === ShowPassword.typeText ? ShowPassword.typePassword : ShowPassword.typeText;
    this.passwordIcon = this.passwordIcon === ShowPassword.eyeOff ? ShowPassword.eye : ShowPassword.eyeOff;
  }

  hideShowOldPassword() {
    this.passwordoldType = this.passwordoldType === ShowPassword.typeText ? ShowPassword.typePassword : ShowPassword.typeText;
    this.passwordOldIcon = this.passwordOldIcon === ShowPassword.eyeOff ? ShowPassword.eye : ShowPassword.eyeOff;
  }
  hideShowNewPassword() {
    this.passwordnewType = this.passwordnewType === ShowPassword.typeText ? ShowPassword.typePassword : ShowPassword.typeText;
    this.passwordNewIcon = this.passwordNewIcon === ShowPassword.eyeOff ? ShowPassword.eye : ShowPassword.eyeOff;

  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }


  onSubmit() {
    if (this.changeForm.invalid) {
      this.sharedService.presentAlert(ALERT_MESSAGE.header, ALERT_MESSAGE.messageTry, ALERT_MESSAGE.buttonOk, ALERT_MESSAGE.subHeader);
      return;
    }
    const password = this.changeForm.value.confirmPassword;
    const deviceStatus: boolean = navigator.onLine;

    if (deviceStatus === true) {
      (this.accountService.changePassword(password)).subscribe((res: AuthResponse) => {
        if (res.status === ApiStatus.success) {
          this.accountService.setCurrentUser(res.data);
          this.sharedService.presentToast(TOAST_MESSAGE.passwordUpdated, TOAST_MESSAGE.lightColor, TOAST_MESSAGE.top);
          this.router.navigate(['home/settings']);
        }
        else {
          this.sharedService.presentToast(TOAST_MESSAGE.tryAgain, TOAST_MESSAGE.dangerColor, TOAST_MESSAGE.top);
        }
      });
    } else {
      this.sharedService.presentToast(TOAST_MESSAGE.offline, TOAST_MESSAGE.dangerColor, TOAST_MESSAGE.top);
    }
  }

  async close() {
    if (!this.changeForm.pristine) {
      await this.sharedService.showWarning();
    }
    if (this.changeForm.pristine) {
      this.modalCtrl.dismiss();
    }
  }

}
