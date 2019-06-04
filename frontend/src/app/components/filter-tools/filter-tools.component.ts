import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filter-tools',
  templateUrl: './filter-tools.component.html',
  styleUrls: ['./filter-tools.component.css']
})
export class FilterToolsComponent implements OnInit {
  //este atributo es el encargado de mostrar u ocultar el sidebar de filtros
  toggled:boolean = false;

  categories: any = [];

  //atributo encargado de almacenar el nivel de categorias que se muestra en el sidebar
  tmpCategories: any = [];

  categoriesSelected: any = [];

  categoriesChanged:boolean = false;

  subCategoriesChanged:boolean = false;

  next:boolean = false;

  previous:boolean = false;

  /* atributo encargado de almacenar las preferencias de busqueda 
  por rago de precios y los almacena en un objeto tomando en cuenta si es menor o mayor el valor de busqueda */
  priceRange = {
    lower: {value: 0, operator: '<'},
    higher: {value: 0, operator: '>'}
  };

  // este atributo almacenara la caracteristica dele producto por la que se desea filtrar ej: available, price, quantity
  valoration:string = '';

  /* con este atributo la aplicación se puede ubicar y saber cual submenu es el que se esta visualizando y con esto saber
   cual subnivel es el siguiente o elanterior*/
  whereAmI:any = [
    
  ];

  sort:any = {
    asc:  true,
    type: ''
  };

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
  //método que se encarga de activar o desactivar las subcategorias de una categoria padre dependiendo de su valor si esta activa o inactiva
  checkChildrenCategories(SubCategories, checked){
    SubCategories.forEach( SubCategory => {
      SubCategory.checked = checked;
      if(checked){
        this.categoriesSelected.push(SubCategory.id);
      } else {
        let position = this.categoriesSelected.indexOf(SubCategories.id);
        this.categoriesSelected.splice(position, 1);
      }
      if(SubCategory.sublevels) this.checkChildrenCategories(SubCategory.sublevels, checked);
    });
    
  }

  categoryChanged (checked, category) {

    if(checked){
      this.categoriesSelected.push(category.id);
    } else {
      let position = this.categoriesSelected.indexOf(category.id);
      this.categoriesSelected.splice(position, 1);
    }

    if(category.sublevels) this.checkChildrenCategories(category.sublevels, checked);
    if(this.categoriesSelected.length) this.productService.getProductsByCategories(this.categoriesSelected);
    else this.productService.getProducts();
  }

  moneyFilter(){
    //this.productService.operator = this.rangeOperator;
    this.productService.priceRange = this.priceRange;
    this.productService.filter();
  }

  availableSelected(){
    this.productService.valoration = this.valoration;
    this.productService.filter();
  }
  changeVisibility(type){
    this.next = type;
    this.previous = !type;
  }
  nextSubCategories(category){
    this.changeVisibility(true);
    this.categoriesChanged = true;
    setTimeout(() => {
      this.tmpCategories = category.sublevels;
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

  changeShortingType(){
    this.sort.asc = !this.sort.asc;
    this.productService.sort = this.sort;
    if(this.sort.type) this.productService.filter();
  }

  sortSelected(){
    this.productService.sort = this.sort;
    this.productService.filter();
  }
}
