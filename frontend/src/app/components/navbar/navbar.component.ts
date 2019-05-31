import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }

   searchProduct(search){
    this.productService.search = search;
    this.productService.filter();
  }
}
