const express=require('express')
const router=express.Router()
const database=require('../database/database')
const h=require('../helper')



router.get('/',(req,res)=>{
    database('category').select('*').then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(()=>{
        res.status(200).send(h.responseHandler(true,'error in db',null))
    })

})










module.exports=router