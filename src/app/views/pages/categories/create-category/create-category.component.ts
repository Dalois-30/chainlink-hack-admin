import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { CategoryGetDto } from '../dto/category-get.dto';
import { CategoryService } from '../service/category.service';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  public createForm: FormGroup;
  submitted = false;
  category!: any;
  categories: CategoryGetDto[] = [];
  selectedSearchCategoryId: string = "";
  formData = new FormData();

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _router: Router,
    private _sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    //get user from resolver
    this._route.data.subscribe({
      next: data => {
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

        console.log(this.categories);
      }
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      parent: [""],
      file: ["", [Validators.required]],
    });
    // get all parent categories
  }

  /*show and hide spinner*/
  ShowHideSpinner(action: SpinnerAction) {
    let spinner = document.getElementById("spinner");
    spinner!.style.visibility = action;
  }

  submit() {
    this.ShowHideSpinner(SpinnerAction.VISIBLE);
    console.log(this.createForm.value);
    this.formData.append('name', this.createForm.value.name);
    this.formData.append('description', this.createForm.value.description);
    this.formData.append('parent', this.createForm.value.parent);
    console.log(this.formData);
    this._categoryService.createCategory(this.formData).subscribe(category => {
      console.log("success", category);
      this._sharedService.showSwal("success", "Category created !");
      this._router.navigate(["/category/list"]);
      this.ShowHideSpinner(SpinnerAction.HIDDEN);
    })
  }

  /* Show Image select modal */
  checkAndUpload(e: any) {
    let imgFile = e.target.files[0] as File;
    if (imgFile.type === 'image/png' || imgFile.type === 'image/jpeg' || imgFile.type === 'image/jpg') {
      if ((imgFile.size / 1000000) > 2) {
        this._sharedService.showSwal("error", 'Veuillez selectionner un fichier plus petit!');
      } else {
        console.log("image save", imgFile);
        this.formData.append('file', imgFile!);
      }
    } else {
      this._sharedService.showSwal("info", 'Veuillez selectionner un fichier image ,Attention!');
      let file = document.getElementById('formFile') as HTMLInputElement | null;
      file!.value = '';
    }
  }

}
