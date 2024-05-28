import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../api/service/users.service";


export const userResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const id = route.paramMap.get('id')!; // récupérer l'id depuis le paramètre de route
    return inject(UsersService).getCurrentUser(id); // appeler le service avec l'id
  }