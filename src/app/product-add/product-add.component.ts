import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product:Product={};
  constructor(private productService:ProductService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.productService.addProduct(this.product);
  }
}
