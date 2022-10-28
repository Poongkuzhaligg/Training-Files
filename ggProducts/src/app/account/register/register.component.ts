import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user';
import { AccountService } from '../account.service';
import { Storage } from '@capacitor/storage';
import { first } from 'rxjs/operators';

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
    private router: Router,
    private route: ActivatedRoute,
    private accountServ: AccountService
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
      alert('Data Invalid!');
      return;
    }
    this.userD = Object.assign(this.userD, this.regForm.value);
    this.accountServ.regUser(this.userD);
    this.regForm.reset();
    this.userD.id++;

  }









}
