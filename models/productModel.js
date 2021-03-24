let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');
const path = require('path');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        let product = products.filter(product => product.id == id);
        resolve(product);
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {...product, id: uuidv4()};
        products.push(newProduct);
        writeDataToFile(path.join(__dirname, '../data', 'products.json'), products);
        resolve(newProduct);
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const idx = products.findIndex((p) => p.id == id);
        products[idx] = {id, ...product};
        writeDataToFile(path.join(__dirname, '../data', 'products.json'), products);
        resolve(products[idx]);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id != id);
        writeDataToFile(path.join(__dirname, '../data', 'products.json'), products);
        resolve();
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
