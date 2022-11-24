import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, ModalController, ToastController } from '@ionic/angular';
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
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.accountServ.currrentProfile.subscribe(data => this.currentUser = data);
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      this.presentAlert();
      return;
    }
    const firstname = this.editForm.value.firstname;
    const lastname = this.editForm.value.lastname;
    const emailId = this.editForm.value.email;
    const deviceStatus: boolean = navigator.onLine;

    if (deviceStatus === true) {
      (this.accountServ.editForm(firstname, lastname, emailId)).subscribe((res: AuthResponse) => {
        console.log(res.data);
        if (res.status === 'Success') {
          console.log(res.data);
          this.accountServ.setCurrentUser(res.data);
          // this.ngOnInit();
          this.presentToast('Profile updated successfully!', 'light');
          this.router.navigate(['home/settings']);
        }
        else {
          this.presentToast('Sorry, Try again!', 'danger');
        }
      }, err => {
        console.error('editprofile', err);
        throw (err);
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

  close() {
    this.modalCtrl.dismiss();
  }

}
