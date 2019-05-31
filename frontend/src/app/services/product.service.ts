import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any = [];
  productsFiltered: any = [];
  temp: any = [];

  //filters
  search:string = '';
  value:number = 0;
  operator:string = '';
  valoration:string = '';

  constructor(private http: HttpClient) { }
  assignCopy(){
    this.productsFiltered = Object.assign([], this.products);
  }
  getProducts() {
    this.http.get('http://localhost:3000/products/')
    .subscribe(
      (response) => {
        this.products = response;
        this.filter();
      }
    );  
  }

  getProductsByCategories(categories){
    let params = new HttpParams().set('categories', categories);
    this.http.get('http://localhost:3000/products/categories', { params })
    .subscribe(
      (response) => {
        this.products = response;
        this.filter();
      }
    ); 
  }
  filter(){
    this.assignCopy();
    if(this.search) this.productsFiltered = this.searchProduct(this.search, this.productsFiltered);
    if(this.value) this.productsFiltered = this.moneyFilter(this.operator, this.value, this.productsFiltered);
    if(this.valoration) this.productsFiltered = this.valorationFilter(this.productsFiltered);
  }
  searchProduct(value, products){
    return products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
  }

  moneyFilter(operator, value, products){
    return products.filter((product) => {
      if(eval(`${parseFloat(product.price.replace('.',''))} ${operator} ${value}`)){
          return product;
      }
    }); 
  }

  valorationFilter(products){
    return products.filter((product) => product[this.valoration]);
  }
}
