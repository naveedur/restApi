const express=require('express')

const router=express.Router()
const Model=require('./productModel.js')

router.post('/add', async (req,res)=>{
    const product=req.body;
    const newProduct= new Model(product);

    try {
        await newProduct.save();

        res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json({message:error.message})
        
    }})

router.get('/get',async (req,res)=>{
    try {

        const {company,name,sort}=req.query
        const queryObject={}
        if(company){
            queryObject.company=company
        }
        if(name){
            queryObject.name={ $regex: name, $options: "i" }
        }
        let apiCall=Model.find(queryObject)
        if(sort){
            let apiSort=sort.replace(","," ")
            apiCall=apiCall.sort(apiSort)
            console.log(apiSort)
        }
        let page=Number(req.query.page) || 1
        let limit=Number(req.query.limit) || 3

        let skip=(page-1) * limit
        apiCall=apiCall.skip(skip).limit(limit)

        console.log(queryObject)
        const products=await apiCall 
        res.status(200).json(products)
    } catch (error) {
       res.status(404).json({message:error.message}) 
    }})

    module.exports=router