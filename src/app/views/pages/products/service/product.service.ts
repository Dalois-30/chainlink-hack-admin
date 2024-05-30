import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';
import { SharedService } from 'src/app/views/shared/shared.service';
import { environment } from 'src/environments/environment';
import { ProductUpdateDto } from '../dto/product-update.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private host: string = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
    private _sharedService: SharedService
  ) { }

  /**\
     * Recuperer la liste de tout les produits
     * 
     */
  getAllProducts(page?: number, limit?: number) {
    return this.httpClient.get<any>(`${this.host}/products/get-all?page=${page}&limit=${limit}`).pipe(
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

  /**\
     * Creer un produit
     * 
     */
  getOneProduct(id: string): any {
    return this.httpClient.get<any>(`${this.host}/products/get-one/${id}/`).pipe(
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

  /**\
   * Creer un produit
   * 
   */
  createProduct(formData: FormData) {
    return this.httpClient.post<any>(`${this.host}/products/create`, formData).pipe(
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

  /**\
   * Mettre à jour un produit
   * 
   */
  updateProduct(product: ProductUpdateDto, uuid: any) {
    return this.httpClient.put<any>(`${this.host}/products/update/${uuid}`, product).pipe(
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
