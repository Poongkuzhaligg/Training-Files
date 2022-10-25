
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';

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
    private route: ActivatedRoute,
    private router: Router,
    private accountServ: AccountService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submit = true;

    if(this.loginForm.invalid) {
      alert('Data Invalid!');
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;



    this.accountServ.login( email, password);
    // .pipe(first())
    // .subscribe({
    //     next: () => {
    //         const userpage = this.route.snapshot.queryParams['/'];
    //         this.router.navigateByUrl(userpage);
    //     }
    // });



  }

}


















   // this.user = Object.assign(this.user, this.loginForm.value);
    // localStorage.setItem('Users', JSON.stringify(this.user));
    // console.log(this.user);
