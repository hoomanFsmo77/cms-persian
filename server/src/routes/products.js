const express=require('express')
const router=express.Router()
const h=require('../helper')
const database=require('../database/database')

router.get('/',(req,res)=>{
    database('products').
    select('*').
    then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    database('products').
    select('*').
    where({id}).
    then(response=>{
        if(response.length>0){
            res.status(200).send(h.responseHandler(false,null,response[0]))
        }else{
            res.status(200).send(h.responseHandler(true,'product not found',null))
        }
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    database('products').
    where({id}).
    del().
    then(()=>{
        res.status(200).send(h.responseHandler(false,'product deleted',null))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})


router.put('/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    if(body){
        database('products').
        where({id}).
        update(body).
        then(()=>{
            res.status(200).send(h.responseHandler(false,'product updated',null))
        }).catch(err=>{
            res.status(200).send(h.responseHandler(false,'error in connecting to db!',null))
        })
    }else{
        res.status(200).send(h.responseHandler(true,'missing required body',null))
    }
})


router.post('/',(req,res)=>{
    const body=req.body
    if(body.title && body.price && body.count && body.img && body.popularity && body.sale && body.colors){
        database('products').
        insert(body)
        .then(response=>{
            res.status(200).send(h.responseHandler(false,'product added',{id:response[0]}))
        }).catch(err=>{
            res.status(200).send(h.responseHandler(true,'error in connecting to db!',null))
        })
    }else{
        res.status(200).send(h.responseHandler(true,'title, price, count, img, popularity, sale and colors required',null))
    }
})


module.exports=router