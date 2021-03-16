
class SuperController{

	constructor(db){
        this.db=db
 	}


    all=(req,res,next)=> {
         this.db.find().sort({_id:-1}).then(item=> {
        	 res.status(200).json(item)
        }).catch(e=> res.status(404).json(e))
	}
	
	findOne=(req,res,next)=> {
         this.db.findOne({id:req.params.id}).
         then(item=> {
         	  if(item===null){
         	  	  res.status(201).json("Cet article n'existe pas")

         	  }else{
         	  	  res.status(200).json(item)
         	  }

         }).catch(e=> res.status(404).json(e))
	}

	
	delete=(req,res,next)=>{

		 this.db.deleteOne({id:req.params.id})
		 .then(item=>res.status(200).json('Supprimé (e)'))
		 .catch(e=>res.status(404).json(e))
	}
	deleteAll=(req,res,next)=>{
		  this.db.deleteMany({role:{$ne: 'admin'}  })
		 .then(item=>res.status(200).json('Supprimé (e)'))
		 .catch(e=>res.status(404).json(e))
	}
	

}
module.exports=SuperController;
