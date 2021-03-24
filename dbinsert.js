//Generates faker.js data and writes it to json file
const fs = require('fs');
const faker = require('faker');
const path = require('path');

function fakerProductGenerator(qty) {
    let arr = [];
    for (let i = 0; i < qty; i++) {
        arr.push({
            id: i+1,
            name: faker.commerce.productName(),
            department: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price()
        })
    }
    return arr;
}

fs.writeFile(path.join(__dirname, "data", "products.json"), JSON.stringify(fakerProductGenerator(30)), err => {
    if(err) throw err;
    console.log("File has been written to.");
});
