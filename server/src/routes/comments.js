const express=require('express')
const router=express.Router()
const h=require('../helper')
const database=require('../database/database')


router.get('/',(req,res)=>{
    database('comments').
    join('users','comments.userID','=','users.id').
    join('products','comments.productId','=','products.id').
    select('comments.userID','comments.productId','comments.body','comments.id','comments.isAccept','comments.date','comments.isReply','comments.replyId','comments.hour','users.firstname','users.lastname','products.title as productTitle').
    then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    database('comments').
    join('users','comments.userID','=','users.id').
    join('products','comments.productId','=','products.id').
    select('comments.userID','comments.productId','comments.body','comments.id','comments.isAccept','comments.date','comments.isReply','comments.replyId','comments.hour','users.firstname','users.lastname','products.title as productTitle').
    where('comments.id','=',id).
    then(response=>{
        if(response.length>0){
            res.status(200).send(h.responseHandler(false,null,response[0]))
        }else{
            res.status(200).send(h.responseHandler(true,'comment not found',null))
        }
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    database('comments').
    where({
        id:id,
    }).
    orWhere({ replyId:id}).
    del().
    then(()=>{
        res.status(200).send(h.responseHandler(false,'comment deleted',null))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})


router.put('/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    if(body){
        database('comments').
        where({id}).
        update(body).
        then(()=>{
            res.status(200).send(h.responseHandler(false,'comment updated',null))
        }).catch(err=>{
            res.status(200).send(h.responseHandler(false,'error in connecting to db!',null))
        })
    }else{
        res.status(200).send(h.responseHandler(true,'missing required body',null))
    }
})



router.post('/answer/:commentId',(req,res)=>{
    const commentId=req.params.commentId
    const body=req.body
    if(body){
        database('comments').
        insert({
            body:body.answer,
            date:body.date,
            hour:body.hour,
            userID:body.userID,
            productID:body.productID,
            isReply:1,
            replyId:commentId
        }).then(response=>{
            res.status(200).send(h.responseHandler(false,'reply added',null))
        }).catch(err=>{
            res.status(200).send(h.responseHandler(true,'error in connecting to db!',null))
        })
    }else{
        res.status(200).send(h.responseHandler(true,'missing required body',null))
    }


})


router.put('/status/:commentId/:statusId',(req,res)=>{
    const statusId=req.params.statusId
    const commentId=req.params.commentId
    database('comments').
    update({isAccept:statusId}).
    where({id:commentId}).
    then(response=>{
        res.status(200).send(h.responseHandler(false,'comment updated',null))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'missing required body',null))
    })

})


module.exports=router