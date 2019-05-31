import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private id:number = 0;

  constructor(private route: ActivatedRoute) { 

    

  }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
    }else{
      throw new Error('Se necesita enviar el id del producto');
    }
  }

}
