import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ProductService } from "../service/product.service";


export const productResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('id')!; // récupérer l'id depuis le paramètre de route
  return inject(ProductService).getOneProduct(id); // appeler le service avec l'id
}

export const productsResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(ProductService).getAllProducts(0, 10); // appeler le service avec l'id
}