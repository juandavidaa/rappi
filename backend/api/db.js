const fs = require('fs');

const saveData = async (categories, products) => {
    let data = JSON.stringify({categories, products});
    await fs.writeFile(process.env.db, data, (err) => {
        if(err) throw new Error("No ha sido posible guardar la información en la base de datos", err);
    });
    return true;
}


/**
* El comentario comienza con una barra y dos asteriscos.
* Cada nueva línea lleva un asterisco al comienzo.
* @param {string} table indica el nombre de la "tabla" que queremos acceder Ej: products, categories
*/
const getData = async (table) => {
    let file;
    try {
        file = require(`${process.env.db}${table}`); 
    } catch (error) {
        return [];
    }
    
    return file[table];
}




module.exports = {
    getData,
    saveData
}