const express=require('express')
const router=express.Router()
const database=require('../database/database')
const h=require('../helper')



router.post('/',(req,res)=>{
    const body=req.body
    if(body){
        database('basket').insert({
            userID:body.userID,
            productID:body.productID,
            count:body.count
        }).then(response=>{
            res.status(200).send(h.responseHandler(false,'added',null))
        }).catch(err=>{
            res.status(400).send(h.responseHandler(true,'error in connecting to db',null))
        })
    }else{
        res.status(400).send(h.responseHandler(true,'missing required body',null))
    }


})

router.get('/products/:userID',(req,res)=>{
    const userID=req.params.userID;
    database('basket').
     join('products','basket.productID','=','products.id').
     join('users','basket.userID','=','users.id')
     .select('products.id as productID','products.img as productImg','products.title as productTitle','products.price as productPrice','products.url as productUrl','users.firstname','users.lastname','users.username','users.id as userID','basket.count','basket.id').
        where('users.id','=',userID)
        .then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(400).send(h.responseHandler(true,'missing required body',null))
    })

})


router.put('/:userID/:productID',(req,res)=>{
    const userID=req.params.userID
    const productID=req.params.productID
    const status=req.query.status
    if(status==='increase'){
        database('basket').
        where({userID:userID,productID:productID}).
         increment('count',1).then(response=>{
            res.status(200).send(h.responseHandler(false,'count increased',null))
        })


    }else if(status==='decrease'){
        database('basket').
        where({userID:userID,productID:productID}).
        decrement('count',1).then(response=>{
            res.status(200).send(h.responseHandler(false,'count decreased',null))
        })
    }else{
        res.status(400).send(h.responseHandler(true,'missing required query status',null))
    }

})



module.exports=router