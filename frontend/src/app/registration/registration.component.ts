import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(registerForm: any) {
    if (registerForm.value.role === "Admin") {

      delete registerForm.value['role'];
      console.log(registerForm.value)

      this.userService.registerNewAdmin(registerForm.value).subscribe(data => {
        console.log(data)
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
        (error) => console.log(error));
    } else {
      console.log("user");
      delete registerForm.value['role'];
      this.userService.registerNewUser(registerForm.value).subscribe(data => {
        console.log(data)
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
        (error) => console.log(error));

    }
  }

  registerForm = new FormGroup(
    {
      userFirstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      userLastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9@!#$%^&*]+$')]),


      emailId: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+(com|in)$")]),

      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^\\d{10}$")]),
      role: new FormControl('', [Validators.required]),


    }


  );

  get user() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm)
    this.register(this.registerForm);
  }

}
