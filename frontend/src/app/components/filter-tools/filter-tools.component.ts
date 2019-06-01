import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { type } from 'os';

@Component({
  selector: 'app-filter-tools',
  templateUrl: './filter-tools.component.html',
  styleUrls: ['./filter-tools.component.css']
})
export class FilterToolsComponent implements OnInit {

  toggled:boolean = false;
  categories: any = [];
  tmpCategories: any = [];
  categoriesSelected: any = [];
  categoriesChanged:boolean = false;
  subCategoriesChanged:boolean = false;
  next:boolean = false;
  previous:boolean = false;
  ranges = [
    {name: 'precio mayor a', operator: '>', active: false},
    {name: 'precio menor a', operator: '<', active: true}
  ];
  rangeOperator = '<';
  valoration:string = '';
  whereAmI:any = [
    
  ];

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit() {
    this.categoryService.getCategories()
    .subscribe(
      (response) => {
        this.categories = response;
        this.tmpCategories = response;
      }
    );  
  }

  toggleSideBar () {
    this.toggled = !this.toggled;
  }

  categoryChanged (checked, id) {
    if(checked) this.categoriesSelected.push(id);
    else this.categoriesSelected = this.categoriesSelected.filter( idCategory => id != idCategory);
    if(this.categoriesSelected.length > 0) this.productService.getProductsByCategories(this.categoriesSelected);
    else this.productService.getProducts();
  }

  rangeSelected(operator) {
    this.ranges.forEach((range) => range.active = false);
    this.rangeOperator = operator;
  }
  moneyFilter(value){
    this.productService.operator = this.rangeOperator;
    this.productService.value = value;
    this.productService.filter();
  }

  valorationSelected(){
    this.productService.valoration = this.valoration;
    this.productService.filter();
  }
  changeVisibility(type){
    this.next = type;
    this.previous = !type;
  }
  nextSubCategories(category){
    console.log(this.whereAmI);
    this.changeVisibility(true);
    this.categoriesChanged = true;
    this.tmpCategories = category.sublevels;
    setTimeout(() => {
      this.categoriesChanged = false; 
      this.whereAmI.push(category.id);
    }, 600)
  }
  previousSubCategories(category){
    this.changeVisibility(false);
    this.subCategoriesChanged = true;
    this.whereAmI.pop();
    setTimeout(() => {
      this.subCategoriesChanged = false; 
      this.tmpCategories = this.findParent();
    }, 600)
  }
  findParent(){
    
    let tmp = Object.assign([], this.categories);
    this.whereAmI.forEach(function(id) {
      tmp = tmp.find((category) => category.id == id);
    });
    return tmp.sublevels? tmp.sublevels: tmp;
  }
}
