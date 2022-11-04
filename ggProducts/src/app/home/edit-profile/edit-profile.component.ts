import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    this.currentUser = await this.accountServ.loggedUser();
    this.editForm = this.formBuilder.group({
      username: [this.currentUser?.username, Validators.required],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if(this.editForm.invalid) {
      this.presentAlert();
      return;
    }

    const username = this.editForm.value.email;
    const password = this.editForm.value.confirmPassword;
    this.accountServ.editForm(username, password);
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

}
