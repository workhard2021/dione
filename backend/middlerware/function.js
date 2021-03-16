const fs=require('fs');
const jwt = require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cloudinary = require('cloudinary');
const dotenv=require('dotenv');

const way=__dirname.replace('backend/middlerware','app/public/image/');
const deleteImage=path=>{
              // const way_dur=way+file;
	           fs.exists(path,exist=>{
	 	             if(exist){
	 	      	   	    fs.unlink(path,error=>{
	 	      	   	    	   if(error){
	 	      	   	    	   	   //console.log(error)
	 	      	   	    	    }
	 	      	   	    })
	 	      	     }
	 	        })         
};

function ValidationMail(email)
{
	return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i.test(email);	
}

 
const authentification = (req, res, next) => {

          let userIdParam=0;
		  try {
		  	    if(req.params.id !==null && req.params.id!==undefined){
		  	     	userIdParam=req.params.id;
		  	    }
		  	    else if(req.body.idUser!==null && req.body.idUser !==undefined) {
		  	     	 userIdParam=req.body.idUser;    
		  	     }
	                const token=req.headers.authorization;
			        const decodedToken = jwt.verify(token,'SECRTE_JWT');
			        const idUser = decodedToken.idUser;
		        if( userIdParam===idUser) {
		        	 next();
		        }else 
		        {   
		            res.status(201).json(false)
		        }

		  } catch(e){

		        res.status(404).json(e.message)
		  }

};

const  phoneNumber=(num_tel)=> {
	// Definition du motif a matcher
	var regex = new RegExp(/^(01|02|03|04|05|06|08)[0-9]{8}/gi);
	 return regex.test(num_tel)
}


const storage=multer.diskStorage({
     
	       destination:function(req,file,callaback){
                callaback(null,way);

	       },
	       filename:function(req,file,callaback){
	       	    let ext=path.extname(file.originalname);
	       	    callaback(null,Date.now()+ext);
	       }
});

const multer_=multer({

	         storage:storage,
	         limits:{fileSize:10000000},
	         fileFilter:function(req,file,callaback){

	          	   if(file.mimetype.match(/\/(jpeg|jpg|gif|png)$/)!==null){

                            callaback(null,true);  

	          	    }else{
						   callaback(null, false)
	          	    }   
	          }         
 });




dotenv.config();
const cloudinaryKey= process.env.CLOUD_NAME? {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
} : {
    cloud_name:'workhard201',
    api_key:121513654529346,
    api_secret:'k59zOPl4iwEuFtgksWGJyIb1LBs'
 }

 cloudinary.config(cloudinaryKey)

upload = (file, folder) => {

     return   cloudinary.uploader.upload(file, (result) => {
			 return result
	    })
}
destroy = (file, folder) => {

	return   cloudinary.uploader.destroy(file, (result) => {
			return result
	   })
}

 
module.exports={
	            deleteImage:deleteImage,
	            ValidationMail:ValidationMail,
	            authentification:authentification,
	            multer_:multer_,phoneNumber:phoneNumber,
				upload:upload,destroy:destroy
	          };
