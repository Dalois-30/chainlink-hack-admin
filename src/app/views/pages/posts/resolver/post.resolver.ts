import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PostService } from "../service/post.service";


export const postResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const id = route.paramMap.get('id')!; // récupérer l'id depuis le paramètre de route
  return inject(PostService).getOnePost(id); // appeler le service avec l'id
}

export const postsResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PostService).getAllPosts(0, 10); // appeler le service avec l'id
}