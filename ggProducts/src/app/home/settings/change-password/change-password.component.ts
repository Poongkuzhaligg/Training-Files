import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { APP_PAGE_TITLE } from 'src/app/config/constants';
import { FormLabelName, SaveBtn, TOAST_MESSAGE, VALIDATION_TEXT } from 'src/app/config/storage-key';
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
  isDirty = false;
  passwordoldType = 'password';
  passwordnewType = 'password';
  passwordType = 'password';
  passwordOldIcon = 'eye-off-outline';
  passwordNewIcon = 'eye-off-outline';
  passwordIcon = 'eye-off-outline';

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.currentUser = await this.accountServ.loggedUser();
    this.changeForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });
    this.changeForm.valueChanges.subscribe(e => this.isDirty = true);
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
    if (this.changeForm.invalid) {
      this.sharedService.presentAlert();
      return;
    }
    const password = this.changeForm.value.confirmPassword;
    const deviceStatus: boolean = navigator.onLine;

    if (deviceStatus === true) {
      (this.accountServ.changePassword(password)).subscribe((res: AuthResponse) => {
        // console.log(res);
        if (res.status === ApiStatus.success) {
          this.accountServ.setCurrentUser(res.data);
          this.sharedService.presentToast(TOAST_MESSAGE.passwordUpdated, TOAST_MESSAGE.lightColor);
          this.router.navigate(['home/settings']);
        }
        else {
          this.sharedService.presentToast(TOAST_MESSAGE.tryAgain, TOAST_MESSAGE.dangerColor);
        }
      });
    } else {
      this.sharedService.presentToast(TOAST_MESSAGE.offline, TOAST_MESSAGE.dangerColor);
    }
  }

  ionViewWillLeave() {
    if (this.isDirty === true) {
      confirm('There are changes you have made to the page. If you quit, you will lose your changes.');
    }
  }

  close() {
    this.changeForm.reset();
    this.modalCtrl.dismiss();
  }

}
