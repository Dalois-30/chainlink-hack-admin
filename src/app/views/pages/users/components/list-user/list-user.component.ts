import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../api/service/users.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/views/shared/shared.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../api/store/reducers/users.reducer';
import { loadUsersSuccess } from '../../api/store/actions/user.actions';
import { UserGetDTO } from '../../api/store/models/user-get-many.dto';
import { CustomSwal } from 'src/app/views/shared/classes/swal';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  searchQuery: string;

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _sharedService: SharedService,
    // private store: Store
  ) { }

  searchText: string;
  filteredUsers: any[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  users: UserGetDTO[];
  

  ngOnInit(): void {
    // this.store.dispatch(loadUsersSuccess({ users: this.users }));
    // console.log(this.users);
    this.init()
  }

  async init() {
    this._userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
      console.log('users loaded', this.users);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });

    this._sharedService.searchQuery$.subscribe(query => {
      this.searchText = query;
      this.updateFilter();
    });
  }
  viewDetails(userId: string) {
    // Redirige vers la page des détails de l'utilisateur en utilisant l'identifiant
    this._router.navigate(['/users/detail', userId]);
  } 

  disableUserPopup(id: string) {
    CustomSwal.custom({
      icon: 'warning',
      title: 'Attention !',
      showCancelButton: true,
      confirmButtonText: 'Désactiver',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      text: "Etes-vous sûr de vouloir supprimer ce compte utilisateur ?",
    }).then((res) => {
      if (res.isConfirmed) {
        this.deleteUser(id)
      }
    });
  }

  deleteUser(userId: string) {
    this._userService.deleteUser(userId).subscribe({
      next: res => {
        console.log('result', res);
        if (res.statusCode == 400) {
          this._sharedService.showSwal("error", res.message);
          return;
        }else{
          this._sharedService.showSwal("success", "User delete !");
          this.init();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error", error);
        if (error.status == 0) {
          // this.toast.error("Impossible de se connecter , vérifiez votre connexion internet et rééssayez!");
          this._sharedService.showSwal("error", "Network Error!");
          return;
        } else {
          this._sharedService.showSwal("error", "Network Error!");
          return;
        }
      }
    });
  } 

  clearSearch() {
    this.searchText = '';
    this.updateFilter();
  }
  
  
  updateFilter() {
    if (!this.searchText) {
      this.filteredUsers = this.users;
      return;
    }
    const filterText = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter((user: any) => {
      return (
        user.username.toLowerCase().includes(filterText) ||
        user.email.toLowerCase().includes(filterText) ||
        user.role.toLowerCase().includes(filterText)
      );
    });
  }
  
  
  
}
