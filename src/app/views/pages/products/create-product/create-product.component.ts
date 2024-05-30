import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerAction } from 'src/app/core/constant';
import { SharedService } from 'src/app/views/shared/shared.service';
import { ProductService } from '../service/product.service';
import { ProductGetDto } from '../dto/product-get.dto';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public createForm: FormGroup;
  submitted = false;
  product!: any;
  products: ProductGetDto[] = [];
  selectedSearchProductId: string = "";
  formData = new FormData();

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
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
        const products = data.products;
        // set product object
        for (let index = 0; index < products.length; index++) {
          const catGet = products[index];
          const catDto = new ProductGetDto();
          // set element object
          catDto.id = catGet.product.id;
          catDto.name = catGet.product.name;
          catDto.description = catGet.product.description;
          catDto.stock = catGet.product.stock;
          catDto.image = catGet.image;

          //append product table
          this.products.push(catDto);
        }

        console.log(this.products);
      }
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
      file: ["", [Validators.required]],
    });
    // get all parent products
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
    this.formData.append('price', this.createForm.value.price);
    console.log(this.formData);
    this._productService.createProduct(this.formData).subscribe(product => {
      console.log("success", product);
      this._sharedService.showSwal("success", "Product created !");
      this._router.navigate(["/products/list"]);
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
