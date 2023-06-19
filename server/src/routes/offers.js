const express=require('express')
const router=express.Router()
const h=require('../helper')
const database=require('../database/database')

router.get('/',(req,res)=>{
    database('offers').
    join('admin','offers.adminID','=','admin.id').
    join('products','offers.productID','=','products.id').
    select('products.title as productTitle','admin.firstname','admin.lastname','offers.code','offers.percent','offers.date','offers.isActive','offers.id').
    then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    database('offers').
    where({id}).
    del().
    then(()=>{
        res.status(200).send(h.responseHandler(false,'order deleted',null))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.put('/active-off/:id/:isActive' ,(req,res)=>{
    const id=req.params.id
    const isActive=req.params.isActive
    database('offers').
    where({id}).
    update({isActive}).
    then(()=>{
        res.status(200).send(h.responseHandler(false,'order updated',null))
    }).
    catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })

})







module.exports=router