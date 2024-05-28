import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../../api/service/users.service';
import { CreateUserDto } from '../../dto/create-user.dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public createForm: FormGroup;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.createForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  /*show and hide spinner*/
  ShowHideSpinner(action: SpinnerAction) {
    let spinner = document.getElementById("spinner");
    spinner!.style.visibility = action;
  }

  submit() {
    this.ShowHideSpinner(SpinnerAction.VISIBLE)
    const form = this.createForm.value;
    const user: CreateUserDto = form;
    console.log("form submitted", user);
    this.ShowHideSpinner(SpinnerAction.VISIBLE);
    this._userService.createUser(user).subscribe({
      next: res => {
        console.log('result', res);
        if (res.statusCode == 400) {
          this._sharedService.showSwal("error", res.message);
          this.ShowHideSpinner(SpinnerAction.HIDDEN)
          return;
        }else{
          this._sharedService.showSwal("success", "User created !");
          this._router.navigate(["/users/list"]);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error", error);
        if (error.status == 0) {
          // this.toast.error("Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
          this._sharedService.showSwal("error", "Network Error!");
          this.ShowHideSpinner(SpinnerAction.HIDDEN)
          return;
        } else {
          this._sharedService.showSwal("error", "Network Error!");
          this.ShowHideSpinner(SpinnerAction.HIDDEN);
          return;
        }
      }
    })
  }

}
