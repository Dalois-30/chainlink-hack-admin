import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CategoryService } from "../service/category.service";


export const categoryResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('id')!; // récupérer l'id depuis le paramètre de route
  return inject(CategoryService).getOneCategory(id); // appeler le service avec l'id
}

export const categoriesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CategoryService).getAllCategories(0, 10); // appeler le service avec l'id
}