
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ApiStatus } from 'src/app/model/account-model';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { environment } from 'src/environments/environment';
import { AccountPageTitle, ACCOUNT_PAGE, SuggestionStrings } from 'src/app/config/constants';
import { ALERT_MESSAGE, EmailPattern, FormLabelName, TOAST_MESSAGE, VALIDATION_TEXT } from 'src/app/config/storage-key';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  suggestion = SuggestionStrings;
  loginForm: FormGroup;
  loginTitle = AccountPageTitle;
  passwordType = 'password';
  passwordIcon = 'eye-off-outline';
  version = environment.version;
  landingStrings = ACCOUNT_PAGE;
  validationText = VALIDATION_TEXT;
  formLabel = FormLabelName;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['peri@winkle.com', [Validators.required, Validators.email, Validators.pattern(EmailPattern.pattern)]],
      password: ['periperi', [Validators.required, Validators.minLength(6)]]
    });

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.sharedService.presentAlert(ALERT_MESSAGE.header, ALERT_MESSAGE.messageTry, ALERT_MESSAGE.buttonOk, ALERT_MESSAGE.subHeader);
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const deviceStatus: boolean = navigator?.onLine;

    if (deviceStatus === true) {
      this.accountService.login(email, password).
        pipe(
          map((result) => {
            // console.log(res);
            if (result.status === ApiStatus.success) {
              this.accountService.setCurrentUser(result.data.user);
              this.accountService.setUserToken(result.data.token);
              this.router.navigate(['/home']);
              return;
            }
          }),
          catchError((err) => {
            if (err.status === 504) {
              this.sharedService.presentToast(TOAST_MESSAGE[504], TOAST_MESSAGE.dangerColor);
              // console.error('504', err.status);
              throw (err);
            }
            this.sharedService.presentToast(TOAST_MESSAGE.invalidUser, TOAST_MESSAGE.dangerColor);
            throw (err);
          }
          )).subscribe();
    } else {
      this.sharedService.presentToast(TOAST_MESSAGE.offline, TOAST_MESSAGE.dangerColor);
    }
  }

  ionViewWillLeave() {
    // this.loginForm
    this.loginForm.reset();
  }

  async openHelp() {
    this.sharedService.openModal(HelpComponent);
  }

  async openPrivacyPolicySite() {
    await this.sharedService.openPrivacyPolicy();
  };

}

















