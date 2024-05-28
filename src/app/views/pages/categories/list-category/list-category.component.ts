import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/views/shared/shared.service';
import { CategoryService } from '../service/category.service';
import { CategoryGetDto } from '../dto/category-get.dto';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {


  searchQuery: string;

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  searchText: string;
  filteredCat: CategoryGetDto[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  categories: CategoryGetDto[] = [];

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this._categoryService.getAllCategories(0, 10).subscribe(categories => {
      // set category object
      for (let index = 0; index < categories.length; index++) {
        const catGet = categories[index];
        const catDto = new CategoryGetDto();
        // set element object
        catDto.id = catGet.cat.id;
        catDto.name = catGet.cat.name;
        catDto.description = catGet.cat.description;
        catDto.image = catGet.image;
        catDto.children = catGet.cat.children;
        catDto.posts = catGet.cat.posts;
        catDto.created_at = catGet.cat.created_at;
        catDto.updated_at = catGet.cat.updated_at;

        //append category table
        this.categories.push(catDto);
      }

      this.filteredCat = this.categories;
      console.log('categories loaded', this.categories);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });

    // this._sharedService.searchQuery$.subscribe(query => {
    //   this.searchText = query;
    //   this.updateFilter();
    // });
  }
  viewDetails(objId: string) {
    // Redirige vers la page des détails de l'utilisateur en utilisant l'identifiant
    this._router.navigate(['/category/detail', objId]);
  }
  clearSearch() {
    this.searchText = '';
    this.updateFilter();
  }


  updateFilter() {
    if (!this.searchText) {
      this.filteredCat = this.categories;
      return;
    }
    const filterText = this.searchText.toLowerCase();
    this.filteredCat = this.categories.filter((cat: any) => {
      return (
        cat.name.toLowerCase().includes(filterText) ||
        cat.description.toLowerCase().includes(filterText)
      );
    });
  }

}
