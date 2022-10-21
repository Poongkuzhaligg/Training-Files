import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  i=0;
  submit = false;
  regForm: FormGroup;
  user: User = {
    id:0,
    firstName: '',
    lastName: '',
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

  get flog() {
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

    if(this.regForm.invalid) {
      alert('Data Invalid!');
      return;
    }
    console.log(this.user.id);
    this.user = Object.assign(this.user, this.regForm.value);
    localStorage.setItem('Users', JSON.stringify(this.user));
    console.log(this.user);
    this.user.id++;
    this.accountServ.register(this.regForm.value)
    .pipe(first())
    .subscribe({
        next: () => {
            this.router.navigate(['../login'], { relativeTo: this.route });
        }
    });
  }

}
