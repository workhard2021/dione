const {commandes} =require('../model')
const { v4: uuidv4 } = require('uuid');

const SuperController=require('./SuperController')

class ControllerCommandes extends SuperController{
	constructor(data){
		super(data)     
 	}
 	confirm=(req,res,next)=>{
			const id=req.params.id;
		    this.db.findOne({id:id}).
             then(item=>{
             	    let newValue=item._doc;
             	    newValue={...newValue,confirm:!newValue.confirm}
             	    const msg=newValue.confirm?'Confirmée':'Non confirmée';

		            this.db.updateMany({id:id},{$set:{...newValue} })
				   .then(item=>res.status(200).json(msg))
				   .catch(e=>res.status(404).json(e))

             }).catch(e=> res.status(404).json(e))   
	}
	createCommande=(req,res,next)=> {
		 let item=req.body;
		 let total=0;
		 let {commande,author}=item;
         for(let i=0;i<commande.length;i++){
			  delete commande[i].like;
			  delete commande[i].addCommande;
			  delete commande[i].__id;
			  delete commande[i].__v;
			  total+=commande[i].price*commande[i].quantity;
		 }
			delete author.__id;
			delete author.__v;
			delete author.deni;
			delete author.connected;

        if( (author.address !=='' && author.tel !=='') && (author.address !==undefined && author.tel !==undefined) ) {
			   if( author.tel.length<10 || author.tel.length>10 ) {
				 
				   if(Number(author.tel[0])!==0) { 
				      return res.status(201).json('la taille de numero de telephone doit être 10 chiffre en commencant par 0');
				    } 
			   }
			  if(Number(author.tel[0])!==0) { 
				   return res.status(201).json('la taille de numero de telephone doit être 10 chiffre en commencant par 0');
				}

				const data={id:uuidv4(),commande:commande,author:author,confirm:false,total:total};
        	    this.db.insertMany([data]).
		        then(item=>res.status(200).json('Commande a été envoyée'))
		        .catch(e=>res.status(404).json(e))
        }else{ 
        	 res.status(201).json('Veuillez renseigner tout les champs');
        }
	}

	deleteAll_=(req,res,next)=>{

		this.db.remove({})
	   .then(item=>res.status(200).json('Les commandes ont été supprimées'))
	   .catch(e=>res.status(404).json(e))
	}

	search=(req,res,next)=> {
		//search
		const motif=req.params.motif;
		const regex=new RegExp('^'+motif+'*','i');
		this.db.find({$or:[{"commande.categorie":regex},{"commande.title":regex},{"commande.author.fullName":regex}]}).limit(12).
		then(item=>{res.status(200).json(item) })
		.catch(e=> res.status(404).json(e))

   }
		
}

const ctlcommandes=new ControllerCommandes(commandes)

module.exports={ctlcommandes:ctlcommandes}
