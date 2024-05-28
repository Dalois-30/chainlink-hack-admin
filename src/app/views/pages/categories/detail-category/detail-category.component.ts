import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { CategoryGetDto, UpdateCatDto } from '../dto/category-get.dto';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})
export class DetailCategoryComponent implements OnInit {

  public createForm: FormGroup;
  submitted = false;
  category!: any;
  categories: CategoryGetDto[] = [];
  selectedSearchCategoryId: string = "";
  childrenCategory: any;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    //get user from resolver
    this._route.data.subscribe({
      next: data => {
        this.category = data.category; // get resolved data
        console.log(this.category);
        const categories = data.categories;
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

        this.categories = this.categories.filter(cat => cat.id !== this.category.cat.id)

        console.log(this.categories);
      }
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      name: [this.category.cat.name],
      description: [this.category.cat.description],
      parent: [""],
      // verified: [this.category.verified],
    });
    // get all parent categories
  }

  /*show and hide spinner*/
  ShowHideSpinner(action: SpinnerAction) {
    let spinner = document.getElementById("spinner");
    spinner!.style.visibility = action;
  }
  onCategoryChange(categoryId: string) {
    this._router.navigate(['/category/detail', categoryId]);
  }

  async submit() {
    const value = this.createForm.value;
    const category = new UpdateCatDto();
    category.description = value.description;
    category.name = value.name;
    category.parent = value.parent;
    console.log(category);
    const res = await lastValueFrom(this._categoryService.updateCategory(category, this.category.cat.id));
    if (res) {
      this._sharedService.showSwal("success", "Category updated !");
      this._router.navigate(["/category/list"]);
    };
    this.ShowHideSpinner(SpinnerAction.HIDDEN);
  }
}
