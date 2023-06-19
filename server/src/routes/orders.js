const express=require('express')
const router=express.Router()
const h=require('../helper')
const database=require('../database/database')

router.get('/',(req,res)=>{
    database('orders').
    join('users','orders.userID','=','users.id').
    join('products','orders.productID','=','products.id').
    select('products.title as productTitle','users.firstname','users.lastname','orders.date','orders.price','orders.hour','orders.id','orders.off','orders.sale','orders.popularity','orders.count','orders.sale_count','orders.isActive').
    then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    database('orders').
    join('users','orders.userID','=','users.id').
    join('products','orders.productID','=','products.id').
    select('products.title as productTitle','users.firstname','users.lastname','orders.date','orders.price','orders.hour','orders.id','orders.off','orders.sale','orders.popularity','orders.count','orders.sale_count','orders.isActive').
       where('orders.id','=',id).
    then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})
router.delete('/:id',(req,res)=>{
    const id=req.params.id
    database('orders').
    where({id}).
    del().
    then(()=>{
        res.status(200).send(h.responseHandler(false,'order deleted',null))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.put('/active-order/:id/:isActive' ,(req,res)=>{
    const id=req.params.id
    const isActive=req.params.isActive
    database('orders').
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