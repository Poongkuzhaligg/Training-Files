import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  i=0;
  submit = false;
  regForm: FormGroup;
  userD: User = {
    id:0,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private accountServ: AccountService,
    private alertController: AlertController
    ) { }

  get f() {
      return this.regForm.controls;
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.submit = true;
    if(this.regForm.invalid){
      this.presentAlert();
      return;
    }
    this.userD = Object.assign(this.userD, this.regForm.value);
    this.accountServ.regUser(this.userD);
    this.regForm.reset();
    this.userD.id++;

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
