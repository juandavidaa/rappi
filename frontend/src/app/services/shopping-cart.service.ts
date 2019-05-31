import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart = [];
  constructor() { }

  addToCart(product){
    this.cart.push(product);
  }

  removeFromCart(id){
    this.cart = this.cart.filter(product => product.id != id);
  }
}
