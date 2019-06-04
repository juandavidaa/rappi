import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }
  removeProduct(index){
    this.shoppingCartService.removeFromCart(index);
  }
  changeProduct(product){
    if(!product.totalQuantity) {
      product.totalQuantity = 0;
      this.shoppingCartService.saveCart();
    }
  }
}
