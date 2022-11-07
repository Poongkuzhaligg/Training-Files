import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  userDetails: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if(this.regForm.invalid){
      this.presentAlert();
      return;
    }
    this.userDetails = Object.assign(this.userDetails, this.regForm.value);
    this.accountServ.registerUser(this.userDetails);
    this.presentToast();
    this.regForm.reset();

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registration successful!',
      duration: 1500,
      position: 'top',
      color: 'light'
    });
    await toast.present();
  }







}
