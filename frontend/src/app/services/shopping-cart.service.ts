import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

declare var iziToast:any;


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart = [];
  total:number = 0;
  constructor(private router: Router) {
    this.cart = JSON.parse(window.localStorage.getItem('cart'));
    this.total = Number(window.localStorage.getItem('total'));
    if(!this.cart) this.cart = [];
    if(!this.total) this.total = 0;
    else this.total = Number(this.total);
  }

  saveCart(){
    
    this.total = this.cart.reduce((previous, next) => previous + (next.totalQuantity * next.realPrice), 0);
    window.localStorage.setItem('cart', JSON.stringify(this.cart));
    window.localStorage.setItem('total', `${this.total}`);
  }

  addToCart(product){
    let temp = this.cart.find(item => item.id == product.id);
    if(temp){
      temp.totalQuantity += 1;
    }else{
      if(!product.totalQuantity) product.totalQuantity = 1;
      if(!product.realPrice) product.realPrice = Number(product.price.replace(/[\$,]/g, ''));
      this.cart.push(product);
    }
    this.saveCart();
  }

  removeFromCart(index){
    this.cart.splice(index, 1);
    this.saveCart();
  }

  buy(){
    if(!this.cart.length) {
      iziToast.error({
        title: 'Error',
        message: "You do not have any product in your cart",
      });
      this.router.navigate(['/home']);
      return;
    }
    this.cart = [];
    this.total = 0;
    this.saveCart();
    iziToast.success({
        title: 'OK',
        message: 'Successful purchase',
    });
    this.router.navigate(['/home']);
  }
}
