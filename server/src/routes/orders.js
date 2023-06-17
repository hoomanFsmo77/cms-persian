const express=require('express')
const router=express.Router()
const h=require('../helper')
const database=require('../database/database')

router.get('/',(req,res)=>{
    database('orders').
    select('*').
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