import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  product:Product={};
  form=new FormGroup({
    "productName": new FormControl("",Validators.required),
    "productDescription": new FormControl("",Validators.required),
    "productPrice": new FormControl("",Validators.required)
  });

  constructor(private productService:ProductService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.product=this.form.getRawValue();
    //console.log(this.form.getRawValue());
   this.productService.addProduct(this.product);
  }
}
