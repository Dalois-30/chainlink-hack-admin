import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/service/auth.service';
import { UserGetDTO } from '../../pages/users/api/store/models/user-get-many.dto';
import { CustomSwal } from '../classes/swal';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  userInfos: UserGetDTO;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user's privileges have access to the route
    const requiredPrivileges = next.data["requiredRoles"] as string[];
    console.log(localStorage.getItem('userInfos'))
    this.userInfos = JSON.parse(localStorage.getItem('userInfos'));

    // Check if the user has all the required privileges
    const hasAllRequiredPrivileges = requiredPrivileges.every(privilege => {
      return this.checkPrivilege(privilege);
    });

    if (hasAllRequiredPrivileges) {
      return true;
    } else {
      // Redirect to an unauthorized page or show an error message
      CustomSwal.error("Pas authorisé à acceder cette page !")
      return false;
    }
  }

  private checkPrivilege(privilege: string): boolean {
    // console.log(this.userInfos.role.privileges);
    // Check if the user has the specified privilege
    return this.userInfos.roles.some(( role ) => role === privilege);
    // return this.userInfos.role.privileges.some(({ code }) => code === privilege);
  }
}
