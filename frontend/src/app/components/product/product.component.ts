import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product:any[];
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    
  }
  addToCart(product){
    this.shoppingCartService.addToCart(product);
  }
}
