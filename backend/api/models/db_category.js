/* ======================
    MODELO DE CATEGORIASs
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
let categories = db.getData('categories');

const getCategories = () => categories;


/*===============
 FUTURO CRUD
==============*/

const getCategoryInsertId = () => {
    let id = categories[categories.length - 1].categori_id;
    return ++id;
}

// exportaciones que se podran usar en otros módulos
module.exports = {
    getCategories
};