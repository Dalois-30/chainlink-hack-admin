import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SpinnerAction } from 'src/app/core/constant';
import { ProductGetDto } from '../dto/product-get.dto';
import { SharedService } from 'src/app/views/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ProductUpdateDto } from '../dto/product-update.dto';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  public createForm: FormGroup;
  submitted = false;
  product!: any;
  products: ProductGetDto[] = [];
  selectedSearchProductId: string = "";
  childrenProduct: any;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
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
        this.product = data.product; // get resolved data
        console.log(this.product);
        const products = data.products;
        // set product object
        for (let index = 0; index < products.length; index++) {
          const productGet = products[index];
          const productDto = new ProductGetDto();
          // set element object
          productDto.id = productGet.product.id;
          productDto.name = productGet.product.name;
          productDto.description = productGet.product.description;
          productDto.stock = productGet.product.stock;
          productDto.image = productGet.image;
          productDto.created_at = productGet.product.created_at;
          productDto.updated_at = productGet.product.updated_at;

          //append product table
          this.products.push(productDto);
        }

        this.products = this.products.filter(product => product.id !== this.product.product.id)

        console.log(this.products);
      }
    });
    // initialise form with the data of the form
    this.createForm = this._formBuilder.group({
      name: [this.product.product.name],
      description: [this.product.product.description],
      price: [this.product.product.price],
      // verified: [this.product.verified],
    });
    // get all parent products
  }

  /*show and hide spinner*/
  ShowHideSpinner(action: SpinnerAction) {
    let spinner = document.getElementById("spinner");
    spinner!.style.visibility = action;
  }
  onProductChange(productId: string) {
    this._router.navigate(['/products/detail', productId]);
  }

  async submit() {
    const value = this.createForm.value;
    const product = new ProductUpdateDto();
    product.description = value.description;
    product.name = value.name;
    product.price = value.price;
    console.log(product);
    const res = await lastValueFrom(this._productService.updateProduct(product, this.product.product.id));
    if (res) {
      this._sharedService.showSwal("success", "Product updated !");
      this._router.navigate(["/products/list"]);
    };
    this.ShowHideSpinner(SpinnerAction.HIDDEN);
  }

}
