const express=require('express')
const router=express.Router()
const h=require('../helper')
const database=require('../database/database')

router.get('/',(req,res)=>{
    database('users').
    select('*').
    then(response=>{
        res.status(200).send(h.responseHandler(false,null,response))
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id
    database('users').
    select('*').
    where({id}).
    then(response=>{
        if(response.length>0){
            res.status(200).send(h.responseHandler(false,null,response[0]))
        }else{
            res.status(200).send(h.responseHandler(true,'user not found',null))
        }
    }).catch(err=>{
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id
    database('users').
    where({id}).
    del().
    then(()=>{
        res.status(200).send(h.responseHandler(false,'user deleted',null))
    }).catch(err=>{
	
        res.status(200).send(h.responseHandler(true,'error in connecting to db',null))
    })
})

router.put('/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    if(body){
        database('users').
        where({id}).
        update(body).
        then(()=>{
            res.status(200).send(h.responseHandler(false,'user updated',null))
        }).catch(err=>{
            res.status(200).send(h.responseHandler(false,'error in connecting to db!',null))
        })
    }else{
        res.status(200).send(h.responseHandler(true,'missing required body',null))
    }
})










module.exports=router