const database=require('../database/database')
const h=require('../helper')

module.exports=(req,res,next)=>{
    if(!req.originalUrl.includes('/storage/image/')){
        const token=req.headers.authorization
        database('admin').
        select('token').
        where({token:token}).
        then(response=>{
            if(response.length>0){
                next()
            }else{
                res.status(200).send(h.responseHandler(true,'missing required token',null))
            }
        }).catch(err=>{
            res.status(200).send(h.responseHandler(true,'missing required token',null))
        })
    }else{
        next()
    }

}
