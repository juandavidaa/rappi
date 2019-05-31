/* ======================
    MODELO DE PRODUCTO
    AUTHOR: JUAN DAVID AMAYA
    FECHA: 22/05/2019
======================*/


//objeto respuesta que sera enviado al consumidor
let response = {
    success: true,
    data: {}
}

// se importa nuestra base de datos
let db = require('../db');
let products = db.getData('products');


// método encargado de retornar todos los productos
const getProducts = () => products;

// método que me filtrara todos los productos que coincidan con un nombre de producto funciona como un like de sql
const getProductsLike = (name, products = products) => products.filter((product) => product.toLowerCase().includes(name.toLowerCase()));

//método encargado de filtrar productos por categorias
const getProductsByCategories = async (categories, tmp = null) => {
    if(!tmp) tmp = await products;
    return tmp.filter((product) => {
        for (const category of categories) {
            if(product.categories.indexOf(parseInt(category)) != -1){
                return product;
            }
        }
    });
}

//método encargado de filtrar los productos dependiendo de una propiedad y un operador ej: price > 30000
const filterProducts = (field, operator, value, products = products) =>{
    return products.filter((product) => {
        if(eval(`${product[field]} ${operator} ${value}`)){
            return product;
        }
    });
}

// método que obtiene un unico producto
const getProduct = (id) => products.find((product) => product.id == id);




/* la idea era construir un CRUD para el escalamiento del desarrollo 
=========================================
    CRUD
========================================
*/

// método encargado de asignarme un id de insercción para un producto
const getProductInsertId = () => {
    let id = products[products.length - 1].id;
    return ++id;
}

const saveProduct = async (product) => {
    product.id = getProductInsertId();
    products.push(product);
    await db.saveData()
        .then( 
            data => {
                if(data){
                    response.success = true;
                    response.data = product;
                }
            },
            error => {
                throw new Error(error);
            }
        );
    return response;
}

const deleteProduct = async (id) => {
    products = products.filter((product) => {
        product.id != id;
    });
    await db.saveData()
        .then( 
            data => {
                if(data){
                    response.success = true;
                    response.data = id;
                }
            },
            error => {
                throw new Error(error);
            }
        );
    return response;
}


// exportaciones que se podran usar en otros módulos
module.exports = {
    getProducts,
    getProduct,
    getProductsLike,
    filterProducts,
    getProductsByCategories
}