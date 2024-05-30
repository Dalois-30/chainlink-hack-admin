import { Component, OnInit } from '@angular/core';
import { ProductGetDto } from '../dto/product-get.dto';
import { SharedService } from 'src/app/views/shared/shared.service';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  
  searchQuery: string;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  searchText: string;
  filteredProduct: ProductGetDto[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  products: ProductGetDto[] = [];

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this._productService.getAllProducts(0, 10).subscribe(products => {
      // set product object
      for (let index = 0; index < products.length; index++) {
        const catGet = products[index];
        const productDto = new ProductGetDto();
        // set element object
        productDto.id = catGet.product.id;
        productDto.name = catGet.product.name;
        productDto.description = catGet.product.description;
        productDto.stock = catGet.product.stock;
        productDto.created_at = catGet.product.created_at;
        productDto.updated_at = catGet.product.updated_at;
        productDto.image = catGet.image;


        //append product table
        this.products.push(productDto);
      }

      this.filteredProduct = this.products;
      console.log('products loaded', this.products);
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
    this._router.navigate(['/products/detail', objId]);
  }
  clearSearch() {
    this.searchText = '';
    this.updateFilter();
  }


  updateFilter() {
    if (!this.searchText) {
      this.filteredProduct = this.products;
      return;
    }
    const filterText = this.searchText.toLowerCase();
    this.filteredProduct = this.products.filter((product: any) => {
      return (
        product.name.toLowerCase().includes(filterText) ||
        product.description.toLowerCase().includes(filterText)
      );
    });
  }


}
