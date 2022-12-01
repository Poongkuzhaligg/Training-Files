import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/model/user';
import { ApiStatus, AuthResponse } from 'src/app/model/account-model';
import { Router } from '@angular/router';
import { EmailPattern, FormLabelName, SaveBtn, TOAST_MESSAGE, VALIDATION_TEXT } from 'src/app/config/storage-key';
import { APP_PAGE_TITLE } from 'src/app/config/constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  pageTitle = APP_PAGE_TITLE;
  validationText = VALIDATION_TEXT;
  formLabel = FormLabelName;
  editForm: FormGroup;
  saveBtn = SaveBtn;
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
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.accountService.currrentProfile.subscribe(data => this.currentUser = data);
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(EmailPattern.pattern)]],
    });
    this.editForm.valueChanges.subscribe(e => { this.isDirty = true; console.log(this.editForm.valueChanges); });

  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.sharedService.presentAlert();
      return;
    }
    const firstname = this.editForm.value.firstname;
    const lastname = this.editForm.value.lastname;
    const emailId = this.editForm.value.email;
    const deviceStatus: boolean = navigator.onLine;

    if (deviceStatus === true) {
      (this.accountService.editForm(firstname, lastname, emailId)).subscribe((res: AuthResponse) => {
        if (res.status === ApiStatus.success) {
          this.accountService.setCurrentUser(res.data);
          this.sharedService.presentToast(TOAST_MESSAGE.profileUpdated, TOAST_MESSAGE.lightColor);
          this.router.navigate(['home/settings']);
        }
        else {
          this.sharedService.presentToast(TOAST_MESSAGE.tryAgain, TOAST_MESSAGE.dangerColor);
        }
      }, err => {
        throw (err);
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
    this.editForm.reset();
    this.modalCtrl.dismiss();
  }

}
