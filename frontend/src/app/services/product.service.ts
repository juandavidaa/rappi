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

  priceRange: any = {
    lower: {value: 0, operator: '>'},
    higher: {value: 0, operator: '<'}
  };

  sort:any = {
    asc:  true,
    type: ''
  }

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
    let params = new HttpParams().set('categories', JSON.stringify(categories));
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
    if(this.priceRange.lower.value) this.productsFiltered = this.moneyFilter(this.priceRange.lower.operator, this.priceRange.lower.value, this.productsFiltered);
    if(this.priceRange.higher.value) this.productsFiltered = this.moneyFilter(this.priceRange.higher.operator, this.priceRange.higher.value, this.productsFiltered);
    if(this.valoration) this.productsFiltered = this.valorationFilter(this.productsFiltered);
    if(this.sort.type) this.productsFiltered = this.sortFilter(this.productsFiltered);
  }
  searchProduct(value, products){
    return products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
  }

  moneyFilter(operator, value, products){
    return products.filter((product) => {
      if(eval(`${Number(product.price.replace(/[\$,]/g, ''))} ${operator} ${value}`)){
          return product;
      }
    }); 
  }

  valorationFilter(products){
    return products.filter((product) => product[this.valoration]);
  }

  sortFilter(products){
    if(this.sort.type == 'available'){
      return products.sort((first, second) => {
        if(first.available && !second.available) return this.sort.asc? 1: -1;
        else if(!first.available && second.available) return this.sort.asc? -1: 1;
        else return 0;
      });
    } else if(this.sort.type == 'price'){
      return products.sort((first, second) => {
        let firstPrice = Number(first.price.replace(/[\$,]/g, ''));
        let secondPrice = Number(second.price.replace(/[\$,]/g, ''));
        return this.sort.asc? firstPrice - secondPrice:  secondPrice - firstPrice;
      });
    }else if(this.sort.type == 'quantity'){
      return products.sort((first, second) => {
        return this.sort.asc? first.quantity - second.quantity: second.quantity - first.quantity;
      });
    }
  }
}
