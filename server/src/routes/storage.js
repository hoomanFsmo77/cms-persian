const express=require('express')
const fs = require("fs");
const path=require('path')
const router=express.Router()


router.get('/:image',(req,res)=>{
    const imageName=req.params.image;
    const rootPath=path.join(__dirname,'../')
    const imagePath=rootPath+'/storage/'+imageName;
    fs.readFile(imagePath,{},(error,image)=>{
        if(error){
            res.status(404).end()
        }else{
            res.status(200).send(image)
        }
    })
})





module.exports=router