import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap, map, Observable } from 'rxjs';
import { SharedService } from 'src/app/views/shared/shared.service';
import { environment } from 'src/environments/environment';
import { UpdatePostDto } from 'src/app/views/pages/posts/dto/post-get.dto'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private host: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
    private _sharedService: SharedService
  ) { }

  getAllPosts(page?: number, limit?: number) {
    return this.httpClient.get<any>(`${this.host}/posts/get-all?page=${page}&limit=${limit}`).pipe(
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
    )
  }

  getOnePost(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.host}/posts/getOne/${id}/`).pipe(
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

  createPost(formData: FormData){
    return this.httpClient.post<any>(`${this.host}/posts/create`, formData).pipe(
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
    )
  }

  updatePost(cat: UpdatePostDto, uuid: string) {
    return this.httpClient.put<any>(`${this.host}/posts/update/${uuid}`, cat).pipe(
      shareReplay(1),
      tap({
        next: (response: any) => {
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
    )
  }
}
