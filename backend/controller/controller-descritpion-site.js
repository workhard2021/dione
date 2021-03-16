const {descriptionSite} =require('../model')
const { v4: uuidv4 } = require('uuid');
const {deleteImage,phoneNumber,ValidationMail,upload,destroy} =require('../middlerware/function')

const SuperController=require('./SuperController')

class ControllerDescription extends SuperController{
     constructor(data){
          super(data);
     }
     createSite=(req,res,next)=>{
          let data=JSON.parse(req.body.data);
           const files=req.files;
          
          if(!phoneNumber(data.tel)){
               
            return res.status(201).json('Numero de telephone au format : XX XX XX XX XX');
          }

          if(!ValidationMail(data.email)){
               
            return res.status(201).json('Address email est invalide');
          }

         data={...data,id:uuidv4(),dateInsert:Date.now()}
           if(files.length>0) { 

            for (const file of files) {
                const { path } = file;
                  upload(path,'image').then(result=>{
                    if(result) {

                      if(i===j) {
                         data={...data,cloud_id_first_image:result.public_id,first_image:result.url}

                       }else{
                         data={...data,cloud_id_second_image:result.url,second_image:result.url}
                       }
                      if(i==j) {  
                         this.db.updateOne({id:data.id},{$set:{...data}}).then(item=>{
                              res.status(200).json('Nouvelle mies à jour a été crée')
                           }).catch(e=> res.status(404).json(e))
                      }
                       j++;
                     }
                   })
                 deleteImage(path)
             }
  
           }else{
                  this.db.insertMany([data]).then(item=>{
                        res.status(200).json('Site a été mise à jour')
                }).catch(e=> res.status(404).json(e))
            }
     }

     updateSite=(req,res,next)=>{
        let data=JSON.parse(req.body.data);
        const files=req.files;
        delete data.first_image;
        delete data.second_image;
      
        if(!phoneNumber(data.tel)){
               
          return res.status(201).json('Numero de telephone au format : XX XX XX XX XX');
        }
        if(!ValidationMail(data.email)){
               
          return res.status(201).json('Address email est invalide');
        }
         data={...data,dateInsert:Date.now()}
         for(let i in data){
              if(data[i]===undefined || data[i]==='') {
                  delete data[i];
              }
         }
         if(files.length>0) { 

            let i=files.length-1;
            let j=0;
           for (const file of files) {
               const { path } = file;
                 upload(path,'image').then(result=>{
                     if(result) {

                        if(i===j){
                           destroy(data.cloud_id_first_image);
                           data={...data,cloud_id_first_image:result.public_id,first_image:result.url}
                         }else{
                           destroy(data.cloud_id_second_image)
                          data={...data,cloud_id_second_image:result.public_id,second_image:result.url}
                        }
                        if(i==j) {  
                           this.db.updateOne({id:data.id},{$set:{...data}}).then(item=>{
                                res.status(200).json('Site a été mise à jour')
                             }).catch(e=> res.status(404).json(e))
                        }
                         j++;
                    }
                 })
                 deleteImage(path)
              }

         }else{
                this.db.updateOne({_id:data._id},{$set:{...data} }).then(item=>{
                      res.status(200).json('Site a été mise à jour')
              }).catch(e=> res.status(404).json(e))
          }
   }
    
}
const ctlDescription=new ControllerDescription(descriptionSite)
module.exports={ctlDescription:ctlDescription};