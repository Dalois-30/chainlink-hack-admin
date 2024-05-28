import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get searchQuery$() {
    return this.searchQuerySubject.asObservable();
  }

  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  showSwal(
    icon?: SweetAlertIcon,
    title?: string, 
    position?:SweetAlertPosition,
    timer?: number,
    timerProgressBar?: boolean
  ) {
    swal.fire({
      icon: icon,
      title,
      position: "top-end",
      timer: 2000,
      timerProgressBar: true,
    })
  }
}
