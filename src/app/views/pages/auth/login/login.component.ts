import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';
import swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  public loginForm: FormGroup;
  submitted = false;
  private jwtHelper!: JwtHelperService;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    // private location: Location,
    private route: ActivatedRoute,
    private _sharedService: SharedService
  ) {
    this.jwtHelper = new JwtHelperService()
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }



  /*show and hide spinner*/
  ShowHideSpinner(action: SpinnerAction) {
    let spinner = document.getElementById("spinner");
    spinner!.style.visibility = action;
  }
  login() {
    const form = this.loginForm.value;
    this.ShowHideSpinner(SpinnerAction.VISIBLE)
    this._authService.login(form.email, form.password).subscribe({
      next: res => {
        console.log('result', res);
        if (res.statusCode == 400) {
          this._sharedService.showSwal("error", "Email ou mot de passe incorrect !", 'top-end');
          this.ShowHideSpinner(SpinnerAction.HIDDEN)
          return;
        } else {
          // this.toast.success("Connexion réussie !");
          this._sharedService.showSwal("success", "Connexion réussie !", 'top-end');
          this._router.navigate([this.returnUrl]);
          this.ShowHideSpinner(SpinnerAction.HIDDEN)
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error", error);
        if (error.status == 0) {
          // this.toast.error("Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
          this._sharedService.showSwal("error", "Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
          this.ShowHideSpinner(SpinnerAction.HIDDEN)
          return;
        } else {
          this._sharedService.showSwal("error", "Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
          this.ShowHideSpinner(SpinnerAction.HIDDEN);
          return;
        }
      }
    }
    )
  }



}
