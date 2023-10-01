
const Product = require('../models/products'); 

const getAllProducts = async(req,res) =>{

    const {company,name , select} = req.query;  // neglect wrong query like   http://localhost:5500/api/products?name=iphone10&cnjh=cfgcfgc
    const queryObject = {};            //  It will show only name=iphone10     
       
    if(company){
        queryObject.company = company;
    }
    if(name){
        // queryObject.name = name;    // If search for name=iphone it will return empty data
        queryObject.name = { $regex : name , $options : "i"};   // BY this it matches and return same as name=iphone---
    }                                              //i: To match both lower case and upper case pattern in the string.                                            
    const data = await Product.find(queryObject);


    // const data = await Product.find({});   // fetching all the data
    // const data = await Product.find(req.query);   // fetching searched data By query String
    res.status(200).json({data});  // http://localhost:5500/api/products?company=apple&name=watch
};

const getAllProductsTesting = async(req,res) =>{
    const {select} = req.query;
    const queryObject = {};  
    let apiData = Product.find(queryObject);
    if(select){
        let SelectFix = select.split(",").join(" ");
        apiData = apiData.select(SelectFix);
    }
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page-1) * limit;

    apiData.skip(skip).limit(limit);
    const data = await apiData;

    // const data = await Product.find({company : "mi"});   // fetching specific data
    // const data = await Product.find(req.query).sort("name -price");   // fetching searched data By query String

    // const data = await Product.find(req.query).select("name company"); // only name and companyshow But in browser we will write <<?select=name,company>>
    res.status(200).json({data});      
};



module.exports = { getAllProducts, getAllProductsTesting };






// const {sort} = req.query;  // neglect wrong query like   http://localhost:5500/api/products?name=iphone10&cnjh=cfgcfgc
//     const queryObject = {};            //  It will show only name=iphone10     
    //    let apiData = Product.fnd(queryObject);
    //    if(sort){       /// for sort only when we write in queryString Not every time
    //     let sortFix = sort.replace(","," ");
    //     apiData = apiData.sort(sortFix)
    //    }                                        
//     const data = await apiData;
