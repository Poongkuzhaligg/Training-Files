
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit(){

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
