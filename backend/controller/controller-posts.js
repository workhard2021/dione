const {posts,ipLikes} =require('../model')
const { v4: uuidv4 } = require('uuid');
const {deleteImage,upload,destroy} =require('../middlerware/function')
const ip=require('ip')

const SuperController=require('./SuperController')
class ControllerPosts extends SuperController{
	constructor(data,ipLikes){
		super(data) 
		this.ipLikes =ipLikes;   
 	}

 create=(req,res,next)=> {
         let data=JSON.parse(req.body.data);
         const test=data.categorie !==undefined && data.title !==undefined && data.comment !==undefined && data.price !==undefined ;
         const test2=data.categorie !=='' && data.title !=='' && data.comment !=='' && data.price !=='';
          const files = req.files;
          
        
         if(test===false){
             res.status(201).json('Veuillez renseigner les champs manquants')
         }else if(test2===false){
             res.status(201).json('Veuillez renseigner les champs manquants')
         }else {
            
             data={...data,image:'r1.jpg'};
             if(data.price<=0) {
                res.status(200).json("Le prix est un nombre veuillez le corriger");
             }
             data={id:uuidv4(),...data,price:Number(data.price),dateInsert:Date.now(),like:{count:1,liked:false,},total:1,quantity:1};
               
             if(files.length>0) { 

                for (const file of files) {
                    const { path } = file;
                      upload(path,'image').then(result=>{
                        this.db.insertMany([{...data,cloud_id:result.public_id,image:result.url}]).
                        then(item=>{
                            res.status(200).json('Article a été crée')
                        }).catch(e=> res.status(404).json(e))   
                        
                      })
                     deleteImage(path)
                 }

            }else{
            
               this.db.insertMany([data]).
                then(item=>{
                res.status(200).json('Article a été crée')
              }).catch(e=> res.status(404).json(e))   
            }
             

         } 
  }

  update=(req,res,next)=> {
        
         let data=JSON.parse(req.body.data);
         const test=data.categorie !==undefined && data.title !==undefined && data.comment !==undefined && data.price !==undefined ;
         const test2=data.categorie !=='' && data.title !=='' && data.comment !=='' && data.price !=='' ;
         const files=req.files;

         if(test===false){
             res.status(201).json('Veuillez renseigner les champs manquants')
         }else if(test2===false){
             res.status(201).json('Veuillez renseigner les champs manquants')
         }else {

            if(data.price<=0) {
                res.status(200).json("le prix est un nombre,veuillez le corriger");
             }
             data={...data,price:Number(data.price),dateInsert:Date.now()};
               
             if(files.length>0) { 

                for (const file of files) {
                    const { path } = file;
                      upload(path,'image').then(result=>{
                       this.db.updateOne({id:data.id},{$set:{...data,cloud_id:result.public_id,image:result.url} }).
                          then(item=>{
                            res.status(200).json('Mise à jour a été effectuée')
                       }).catch(e=>{ res.status(404).json(e) })
                       })
                       destroy(data.cloud_id)
                       deleteImage(path)
                 }

            }else{
            
                this.db.updateOne({id:data.id},{$set:{...data} }).
                then(item=>{
                   res.status(200).json('Mise à jour a été effectuée')
                })
               .catch(e=>{
                     res.status(404).json(e)
               })
            }
         } 
  }


 	like=(req,res,next)=>{
            
		    const id=req.params.id;
		    this.db.findOne({id:id}).
             then(item=>{
             	     let newValue=item._doc;
             	     const ipC=ip.address()
        
                     this.ipLikes.count({$and:[{ip:ipC},{id:newValue.id} ]}).then(i=>{

                        if(i===0){
	                           this.ipLikes.insertMany({id:newValue.id,ip:ipC})
	                           .then(ins=>{
                                     newValue={...newValue,like:{...newValue.like,count:newValue.like.count+1,liked: !newValue.like.liked} }
	                           	      this.db.updateOne({id:id},{$set:{...newValue} })
									   .then(item=>res.status(200).json(newValue))
									   .catch(e=>res.status(404).json(e))
	                           }).catch(e=>res.status(404).json(e))
                    	 }else{
                           this.ipLikes.deleteOne({$and:[{id:newValue.id},{ip:ipC}] })
                           .then(del=>{
                                       newValue= {...newValue,like:{...newValue.like,count:newValue.like.count-1,liked:!newValue.like.liked} }
                                       this.db.updateOne({id:id},{$set:{...newValue} })
									   .then(item=>res.status(200).json(newValue))
									   .catch(e=>res.status(404).json(e))

                           }).catch(e=>res.status(404).json(e))
                    	 }
                    }).catch(e=> res.status(404).json(e))      
             }).catch(e=> res.status(404).json(e))	   
    }

    search=(req,res,next)=> {
        //search posts
        const motif=req.params.motif;
        const regex=new RegExp('^'+motif+'*','i');
        const price=/^[0-9]{1,6}[\.]?[0-9]{0,6}$/.test(motif)? Number(motif) :0;
        this.db.find({$or:[{categorie:regex},{title:regex},{price:price}]}).limit(12).sort({date_insert:-1}).
        then(item=>{ res.status(200).json(item) })
        .catch(e=> res.status(404).json(e))
    }

}
const ctlPosts=new ControllerPosts(posts,ipLikes)
module.exports={ctlPosts:ctlPosts}
