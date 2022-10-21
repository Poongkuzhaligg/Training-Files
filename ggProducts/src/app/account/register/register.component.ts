import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  submitted = false;
  regForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder) { }

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
    this.submitted = true;
    console.log(this.regForm.value);
  }

}
