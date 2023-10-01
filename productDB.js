require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/products');

const ProductJson = require('./products.json');

const start = async() =>{
    try {
        await connectDB(process.env.URL);
        await Product.deleteMany();      // Deleting all old entries and adding new entries 
        await Product.create(ProductJson);
        console.log('Successfully Saved Data in Database');
    } catch (error) {
        console.log(error);
    }
}

start();
