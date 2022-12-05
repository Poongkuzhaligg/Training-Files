import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { AuthResponse } from 'src/app/model/account-model';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { environment } from 'src/environments/environment';
import { AccountPageTitle, ACCOUNT_PAGE, SuggestionStrings } from 'src/app/config/constants';
import { ALERT_MESSAGE, EmailPattern, FormLabelName, TOAST_MESSAGE, VALIDATION_TEXT } from 'src/app/config/storage-key';
import { CheckDataComponent } from 'src/app/model/check-Data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  landingStrings = ACCOUNT_PAGE;
  validationText = VALIDATION_TEXT;
  formLabel = FormLabelName;
  registerTitle = AccountPageTitle;
  suggestion = SuggestionStrings;
  regForm: FormGroup;
  version = environment.version;
  isDirty = false;
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
    private accountService: AccountService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(EmailPattern.pattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.sharedService.presentAlert(ALERT_MESSAGE.header, ALERT_MESSAGE.messageTry, ALERT_MESSAGE.buttonOk, ALERT_MESSAGE.subHeader);
      return;
    }
    this.userDetails = Object.assign(this.userDetails, this.regForm.value);
    const deviceStatus: boolean = navigator.onLine;
    if (deviceStatus === true) {
      this.accountService.registerUser(this.userDetails.firstname, this.userDetails.lastname,
        this.userDetails.email, this.userDetails.password).
        pipe(
          map((res: AuthResponse) => {
            // console.log(res);
            if (res.status === 'Success') {
              this.accountService.setCurrentUser(res.data);
              this.sharedService.presentToast(TOAST_MESSAGE.registerSuccess, TOAST_MESSAGE.successColor, TOAST_MESSAGE.top);
              this.router.navigate(['../home']);
              return;
            }
          }),
          catchError((err) => {
            if (err.status === 504) {
              this.sharedService.presentToast(TOAST_MESSAGE[504], TOAST_MESSAGE.dangerColor, TOAST_MESSAGE.top);
              // console.error('504', err.status);
              throw (err);
            }
            this.sharedService.presentToast(TOAST_MESSAGE.emailExist, TOAST_MESSAGE.dangerColor, TOAST_MESSAGE.top);
            throw (err);
          }
          )).subscribe();
    } else {
      this.sharedService.presentToast(TOAST_MESSAGE.offline, TOAST_MESSAGE.dangerColor, TOAST_MESSAGE.top);
    }
  }

  ionViewWillLeave() {
    this.regForm.reset();
  }

  async openHelp() {
    this.sharedService.openModal(HelpComponent);
  }

}


