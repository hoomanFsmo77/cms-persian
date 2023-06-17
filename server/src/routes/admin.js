const express=require('express')
const router=express.Router()
const database=require('../database/database')
const h=require('../helper')

router.post('/',(req,res)=>{
    const token=req.headers.authorization
    database('admin').
    select(['firstname','lastname','id','image','status']).
    where({token}).
    then(response=>{
        if(response.length>0){
            res.status(200).send(h.responseHandler(false,null,response[0]))
        }else{
            res.status(200).send(h.responseHandler(true,'user not found!',null))
        }
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db!',null))
    })
})






module.exports=router