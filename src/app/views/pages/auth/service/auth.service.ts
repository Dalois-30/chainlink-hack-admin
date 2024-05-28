import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, shareReplay, tap } from 'rxjs/operators';
import { UserDecoded } from '../dto/user.dto';
import { SharedService } from 'src/app/views/shared/shared.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private host: string = environment.apiUrl;
  public user: any;
  private jwtHelper!: JwtHelperService;

  constructor(public httpClient: HttpClient,
    private router: Router,
    private _sharedService: SharedService) {
    this.jwtHelper = new JwtHelperService();
  }

  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem('admin_user');
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired(token);

  }
  /* Getting the current user details */
  get token(): any {
    return localStorage.getItem('admin_user')!;
  }

  /* Getting decoded token value */
  get decodedToken(): UserDecoded | any {
    return this.jwtHelper.decodeToken(this.token);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.host + '/auth/login/', { email, password }, { observe: 'body' }).pipe(
      shareReplay(1),
      tap({
        next: (response: any) => {
          console.log("response", response);
          localStorage.setItem('admin_user', response.data.token);
          localStorage.setItem('userInfos', JSON.stringify(this.decodedToken));
          console.log(this.decodedToken);
          console.log("Connexion réussie !");
        },
        error: (error: HttpErrorResponse) => {
          console.log("server error :", error);
          throw new HttpErrorResponse({ status: 409, statusText: "An Error Occured" });
        }
      })
    );
  }

  register(email: string, username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.host + '/auth/signup/', { email, password, username }, { observe: 'body' });
  }

  saveToken(jwt: any): boolean {
    const jwtHelper = new JwtHelperService();
    localStorage.setItem('admin_user', jwt);

    return true;
  }

  logOut(): void {
    localStorage.removeItem('admin_user');
    localStorage.removeItem('userInfos');
    this.router.ngOnDestroy();
    this.router.dispose();
    location.href = '/pages/auth/login';
  }


  /*
  * @return Observable<User>
  */
  getCurrentUser(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.host}/users/${id}/`).pipe(
      shareReplay(1),
      tap({
        next: (response: any) => {
          console.log("Success");
          if (response.statusCode == 400) {
            this._sharedService.showSwal("error", response.message);
            return;
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 0) {
            // this.toast.error("Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
            this._sharedService.showSwal("error", "Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
            return;
          } else {
            this._sharedService.showSwal("error", "Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
            return;
          }
        }
      }),
      map(resp => resp.data)
    );
  }


}
