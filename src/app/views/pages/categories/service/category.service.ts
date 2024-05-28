import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, shareReplay, map, tap } from 'rxjs';
import { SharedService } from 'src/app/views/shared/shared.service';
import { UpdateCatDto } from '../dto/category-get.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private host: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
    private _sharedService: SharedService
  ) { }

  getAllCategories(page?: number, limit?: number) {
    return this.httpClient.get<any>(`${this.host}/category/get-all?page=${page}&limit=${limit}`).pipe(
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

  getOneCategory(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.host}/category/getOne/${id}/`).pipe(
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

  createCategory(formData: FormData){
    return this.httpClient.post<any>(`${this.host}/category/create`, formData).pipe(
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

  updateCategory(cat: UpdateCatDto, uuid: string) {
    return this.httpClient.put<any>(`${this.host}/category/update/${uuid}`, cat).pipe(
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
