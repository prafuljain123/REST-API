require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT ;
const  routes_path = require('./Routes/products');
const connectDB = require('./db/connect');

app.get('/', (req,res) =>{  
    res.send("Hello Live Server Wow");
});

app.use('/api/products',routes_path);

const start = async() =>{
    try {
        await connectDB(process.env.URL);
        app.listen(PORT,()=>{
            console.log(`Server is Running at PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();