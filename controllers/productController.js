const Product = require('../models/productModel');
const { getPostData } = require('../utils');


async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify(products));
    } catch (e) {
        console.log(e);
    }
}

async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if (product.length === 0) {
            res.writeHead(404, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Route Not Found'}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify(product));
        }
    } catch (e) {
        console.log(e);
    }
}

async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const { name, department, description, price } = JSON.parse(body);
        const product = {
            name,
            department,
            description,
            price
        }
        const newProduct = await Product.create(product);
        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));

    } catch (e) {
        console.log(e);
    }
}

async function updateProduct(req, res, id) {
    try {
        let product = await Product.findById(id);
        if (product.length === 0) {
            res.writeHead(404, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Route Not Found'}));
        } else {
            const body = await getPostData(req);
            const { name, department, description, price } = JSON.parse(body);
             const productData = {
                name: name || product.title,
                department: department || product.department,
                description: description || product.description,
                price: price || product.price
            }
            const updatedProduct = await Product.update(id, productData);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify(updatedProduct));
        }


    } catch (e) {
        console.log(e);
    }
}

async function deleteProduct(req, res, id) {
    try {
        let product = await Product.findById(id);
        if (product.length === 0) {
            res.writeHead(404, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Route Not Found'}));
        } else {
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({ message: "Product deleted", product}));
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
