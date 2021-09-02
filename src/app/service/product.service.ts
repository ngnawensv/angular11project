import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri='http://localhost:8080/products'

  constructor( private http:HttpClient) { }

  addProduct(product: Product){
    console.log(product);
    this.http.post(this.uri+'/create',product).subscribe(rss=>console.log('Done'))
  }

}
