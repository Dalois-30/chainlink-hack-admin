import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/service/auth.service';
import { Observable, shareReplay, map, tap } from 'rxjs';
import { CreateUserDto, UpdateUserDto } from '../../dto/create-user.dto';
import { UserRoles } from '../../../auth/dto/user.dto';
import { SharedService } from 'src/app/views/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private host: string = environment.apiUrl;
  public user: any;

  constructor(
    private httpClient: HttpClient,
    private _sharedService: SharedService
  ) { }

  /**
   * @returns Observable<User>
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

  /**
   * 
   * @returns the list of all users
   */
  getAllUsers() {
    return this.httpClient.get<any>(`${this.host}/admin/users/list`).pipe(
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
            this._sharedService.showSwal("error", error.error.message);
            return;
          }
        }
      }),
      map(resp => resp.data)
    )
  }

  /**
   * 
   * @param user user to create
   * @returns the user object 
   */
  createUser(user: CreateUserDto) {
    if(user.role == UserRoles.ADMIN){
      return this.httpClient.post<any>(`${this.host}/admin/user/create`, user).pipe(
        shareReplay(1)
      )
    }
    return this.httpClient.post<any>(`${this.host}/auth/register`, user).pipe(
      shareReplay(1)
    )
  }

  updateUser(user: UpdateUserDto, userId: string) {
    return this.httpClient.put<any>(`${this.host}/users/${userId}`, user).pipe(
      shareReplay(1)
    )
  }

  deleteUser(userId: string) {
    return this.httpClient.delete<any>(`${this.host}/admin/user/delete/${userId}`).pipe(
      shareReplay(1)
    )
  }

}
