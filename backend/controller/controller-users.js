const {users} =require('../model')
const bcrypt=require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const {deleteImage,ValidationMail,phoneNumber,upload,destroy} =require('../middlerware/function')
const salt=10;
const SuperController=require('./SuperController')

class ControllerUsers extends SuperController{
   
   connexion=(req,res,next)=>{
		  let data=req.body;
	if(ValidationMail(data.email)) {
       
		 if(data.email !=='' && data.password !=='') {
		     	 
		     	 this.db.findOne({email:data.email}).then(item=> {
                     if(item !==null){ 

                     	if(item._doc.deni===false) { 
                          
			              bcrypt.compare(data.password,item._doc.password)
					      .then((valid)=>{
					     	if(valid) {

					     		 this.db.updateOne({email:item._doc.email},{$set:{connected:true} })
					     		 .then(a=>{
					     		 	 res.status(200).json({...item._doc,connected:true})
					     		 }).catch(e=>res.status(404).json(e))
					     		  
					     	}else {
					     	   return res.status(201).json('Mot de passe ou email est incorrect')
							 }
							 //password oublier reset 
							 

					      }).catch(e=> res.status(404).json(e) )
					   
					   }else {
					    	return  res.status(201).json("Votre compte est bloqué, veullez contacter l'administrateur de site")

					   }

					 }else {
					    return res.status(201).json('Mot de passe ou email est incorrect')
				    }

				  }).catch( e=>res.status(404).json(e) )
		    
          }else{
         	  const text='Veuillez remplir les champs';
         	 return res.status(201).json(text)
          }
		}else{
			return res.status(201).json('Mot de passe ou email est incorrect')
		}
	}

   deconnexion=(req,res,next)=>{
		   const data=req.body;
		   this.db.updateOne({id:data.id},{$set:{connected:false}})
		   .then(item => res.status(200).json({connected:false}))
		   .catch(e=> res.status(404).json(e))
	}
	createUser=(req,res,next)=>{
		 let data=req.body;
		 
		 data={...data,id:uuidv4(),connected:false,role:'user',tel:'',deni:false,image:'a.jpg',dataInsert:Date.now()};
		 const test=data.password ==='' || data.fullName ===''|| data.email ==='' ||
		  data.password===undefined || data.fullName===undefined || data.email===undefined;
		 if(test){
         	   return res.status(201).json('Veuillez remplir les champs')
         }else{
         	 bcrypt.hash(data.password,salt)
		     .then((password)=>{
                  
                  this.db.find({email:data.email})
                  .then(email=>{
					
                  	   if(email.length>0) {
                             return  res.status(201).json('Cet email existe déja');
                  	   }else {

							if(ValidationMail(data.email)) { 

			                   this.db.insertMany([{...data,password}]).
			                   then(item=>res.status(200).json('Inscription a été effectuée'))
			                   .catch(e=>res.status(400).json(e))

						   }
						   else{
							return res.status('201').json('Addresse email est incorrecte')
					      }

					  }
                  })

		     }).catch(e=> res.status(404).json(e))
         }
	}

	updateUser=(req,res,next)=>{
		
		  let update=JSON.parse(req.body.data);
		  const files=req.files;
		 if(!phoneNumber(update.tel)){
               
			  return res.status(201).json('Numero de telephone au format : XX XX XX XX XX');
		  }
		 
	   if(ValidationMail(update.email)) {

         if(update.fullName ==='' ||  update.email ===''){
             return res.status(201).json('Champs nom complet et email sont obligatoire');

         }else{

           if(update.password ==='' || update.password===undefined){
					   delete update.password;
					   delete update.oldePassword;
					  
					if(files.length>0) { 

						for (const file of files) {
							const { path } = file;
							  upload(path,'image').then(result=>{
			
							   this.db.updateOne({id:update.id},{$set:{...update,cloud_id:result.public_id,image:result.url} }).
								  then(item=>{
									res.status(200).json('Mise à jour a été effectuée')
							   }).catch(e=>{ res.status(404).json(e) })
							   })
							  destroy(update.cloud_id)
							  deleteImage(path)
						 }
		
				     }else{
					
						this.db.updateOne({id:update.id},{$set:{...update} }).
						then(item=>{
						   res.status(200).json('Mise à jour a été effectuée')
						})
					   .catch(e=>{
							 res.status(404).json(e)
					   })
					}

         	  }else{
					
				if(update.oldassword!=='' && update.oldPassword!==undefined) {  
				  
				   this.db.findOne({id:update.id}).then(item=>{
					bcrypt.compare(update.oldPassword,item.password)
					.then((valid)=>{
					   if(valid) {
						
						bcrypt.hash(update.password,salt)
						.then((password)=>{
							
							if(files.length>0) { 

								for (const file of files) {
									const { path } = file;
									  upload(path,'image').then(result=>{
									   this.db.updateOne({id:update.id},{$set:{...update,password,image:result.url} }).
										  then(item=>{
											res.status(200).json('Mise à jour a été effectuée')
									   }).catch(e=>{ res.status(404).json(e) })
									   })
									 deleteImage(path)
								 }
				
							 }else{
							
								this.db.updateOne({id:update.id},{$set:{...update,password} }).
								then(item=>{
								   res.status(200).json('Mise à jour a été effectuée')
								})
							   .catch(e=>{
									 res.status(404).json(e)
							   })
							}
					
					     }).catch(e=> res.status(404).json(e))
							 
					   }else {
						 return	res.status(201).json('Votre ancien mot de passe est invalide')
					   }

					  }).catch(e=>res.status(404).json(e))

				   }).catch(e=>res.status(404).json(e))
	 
				}else{
					return res.status(201).json("Veuillez entrer l'ancien mot de passe");
				}  
         	}

		 }

		
		}else { return res.status('201').json('Addresse email est invalide') }

		 
	}

   deniUser=(req,res,next)=>{
		    //const data=req.body.data;
	          const id=req.params.id;
          	  this.db.findOne({id:id})

          	  .then(item=> {
                   const text=item.deni?item.fullName + ' a été bloqué' :item.fullName + ' a été débloqué';
                   this.db.updateOne({id:id},{$set:{deni:!item.deni}})
                   .then(a=> {
					    this.db.find().then(item=>{
							res.status(200).json({data:item,text:text})
						}).catch(e=>res.status(404).json(e))
				   })
                   .catch(e=>res.status(404).json(e))

          	  }).catch(e=>res.status(404).json(e))   

	}

	deniAllUser=(req,res,next)=>{
			 
			  const deni=req.body.deni;
          	  this.db.find()
          	  .then(item=> {
                     const msg=!deni? 'Les utilisateurs ont été bloqués': 'Les utilisateur ont été débloqués';
                    this.db.updateMany({role:{$not:{$eq:'admin'}}},{$set: {deni:!deni,connected:!deni} })
                   .then(a=> {
					     this.db.find().then(item=>{
					      	res.status(200).json({data:item,text:msg})
						}).catch(e=>res.status(404).json(e))
						
				   }).catch(e=>res.status(404).json(e))

          	  }).catch(e=>res.status(404).json(e))	  
	}
	
	resetPassword=(req,res,next)=>{
		const email=req.body.email;
		const text='Un message a été envoyé à votre email contenant les information de recupération de votre compte';
		const text2="Votre compte est bloqué. Pour plus d'information, veuillez contacter l'administrateur de site"
		 if(ValidationMail(email)) {

			   this.db.findOne({email:email}).then(item=>{
				if(item !==null) {
				   
					if(item.deni===false) {

					 bcrypt.hash(email,salt).then(password=>{

						  this.db.updateOne({email:email},{$set:{password:password,connected:true}})
						  .then(item=>{ 
							     //sendMail
								 return res.status(200).json(password)
								 
						   }).catch(e=>res.status(201).json(e))

					  }).catch(e=>res.status(404).json(e))
					}else {
						 return res.status(201).json(text2)
					}

				}else {
					return  res.status(201).json("Address email n'existe pas");
				}
	         })

		 }else {
			    return res.status(201).json('Adresse email est invalide')
		 }
	       
	}

	connectionPasswordForget=(req,res,next)=>{
	  let data=req.body;
	  
	 if(ValidationMail(data.email)) {
	 
	   if(data.email !=='' && data.password !=='') {
				
				this.db.findOne({email:data.email}).then(item=> {
				   if(item !==null){ 
					   if(item._doc.deni===false) { 
						
						   if(data.secret===item._doc.password) {

								bcrypt.hash(data.password,salt).then(hash=>{
									this.db.updateOne({email:data.email},{$set:{password:hash,connected:true} })
									.then(a=>{
										  //sendMail
										return res.status(200).json({...item._doc,connected:true})
									}).catch(e=>res.status(404).json(e))

								}).catch(e=> res.status(404).json(e))
								 
						   }else {
							  return res.status(201).json('Mot de passe ou email est incorrect !')
						   }							   
					 
					 }else {
						  return  res.status(201).json("Votre compte est bloqué, veullez contacter l'administrateur de site")

					 }

				   }else {
					  return res.status(201).json('Mot de passe ou email est incorrect')
				  }

				}).catch( e=>res.status(404).json(e) )
		  
		}else{
			return res.status(201).json('Veuillez remplir les champs')
		}
	  }else{
		  return res.status(201).json('Votre email est invalide')
	  }
	}

	search=(req,res,next)=> {
		//search user
		const motif=req.params.motif;
		const regex=new RegExp('^'+motif+'*','i');

		this.db.find({$or:[{fullName:regex},{email:regex}]}).limit(12).sort({fullName:1}).
		then(item=>{ res.status(200).json(item) })
		.catch(e=> res.status(404).json(e))
   }

  deleteUser=(req,res,next)=>{
     const user=req.body;	
	 this.db.findOne({email:user.email}).then(item=>{
		  if(item!==null) {
			  bcrypt.compare(user.password,item.password)
			  .then(valid=>{
				    if(valid){
						this.db.deleteOne({email:user.email})
			           .then(item=>res.status(200).json('Votre compte a été supprimé'))
			            .catch(e=>res.status(404).json(e))
					}else{ res.status(201).json('Email out mot de passe est incorrect')}
			    }).catch(e=>res.status(404).json(e))
			
		  }else{
			   res.status(201).json('Mot de passe ou email est invalide')
		  }  
	}).catch(e=> res.status(404).json(e))
	
  }

}

  

const ctlUsers=new ControllerUsers(users)
module.exports={ctlUsers:ctlUsers}
