
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submit = false;
  user = {
    email: '',
    password: ''
  };
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController
    ) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }



  onSubmit(){
    this.submit = true;

    if(this.loginForm.invalid) {
      this.presentAlert();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.accountServ.login(email, password);
    this.loginForm.reset();
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


















   // this.user = Object.assign(this.user, this.loginForm.value);
    // localStorage.setItem('Users', JSON.stringify(this.user));
    // console.log(this.user);
