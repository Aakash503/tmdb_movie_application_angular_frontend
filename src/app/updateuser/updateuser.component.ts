import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/models/user';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {


  userObject = new User();
  image?: File
  wantToUpdate: boolean = false;
  currentUser?: User;
  isFileValid?: boolean;
  profilePicture?: string;



  addressForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.pattern("([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com")]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/)]],
    gender: [null, Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
  });

  constructor(private fb: FormBuilder, private movieService:MovieService, private route: Router, private snackbar: MatSnackBar) { }
  formdata = new FormData;

  get username() { return this.addressForm.get("username") }
  get email() { return this.addressForm.get("email") }
  get password() { return this.addressForm.get("password"); }
  get gender() { return this.addressForm.get("gender") }
  get phoneNumber() { return this.addressForm.get("phoneNumber"); }


  imgupload(event: any) {
    let file: any = event.target.files[0];
    console.log(file);
    this.formdata.append("file", file);
  }



  onSubmit(): void {
    this.formdata.append("user", JSON.stringify(this.addressForm.value))
    console.log(this.addressForm.value);
    this.movieService.updateUserDetails(this.addressForm.value).subscribe(data => {
      console.log(data);
      this.snackbar.open("updated Successfully!", "Close", { duration: 3000 });
      error: (err: any) => this.snackbar.open("update Failed! Due to network issues! Try after some time!", "Close", { duration: 3000 });

    });
    this.route.navigate(['/home'])
  }
}
