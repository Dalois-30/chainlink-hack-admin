import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { UpdateUserDto } from '../../dto/create-user.dto';
import { UsersService } from '../../api/service/users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  public createForm: FormGroup;
  submitted = false;
  user!: any;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _userService: UsersService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    //get user from resolver
    this._route.data.subscribe(data => {
      this.user = data.user; // get resolved data
      console.log(this.user);
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      username: [this.user.username],
      email: [this.user.email],
      role: [this.user.role],
      verified: [this.user.verified],
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
    const user: UpdateUserDto = form;
    console.log("form submitted", user);
    this.ShowHideSpinner(SpinnerAction.VISIBLE);
    this._userService.updateUser(user, this.user.id).subscribe({
      next: res => {
        console.log('result', res);
        if (res.statusCode == 400) {
          this._sharedService.showSwal("error", res.message);
          this.ShowHideSpinner(SpinnerAction.HIDDEN)
          return;
        }else{
          this._sharedService.showSwal("success", "User Updated !");
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
