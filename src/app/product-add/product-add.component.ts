import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  product:Product={};
  form:FormGroup;

  constructor( private fb:FormBuilder, private productService:ProductService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form=this.fb.group({
      "productName": ["",Validators.required],
      "productDescription": ["",Validators.required],
      "productPrice": ["",Validators.required],
    });
  }

  onSubmit() {
    this.product=this.form.getRawValue();
    console.log( this.product);
   //this.productService.addProduct(this.product);
  }
}
