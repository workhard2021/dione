const  MONGODB_KEY= (process.env.MONGODB_KEY || "mongodb+srv://app-david:app-david@cluster0.irndu.mongodb.net/app-david?retryWrites=true&w=majority");
const mongoose=require('mongoose')

const db=async()=> {              
 
	try{
	    await mongoose.connect( MONGODB_KEY,{useNewUrlParser: true,useUnifiedTopology: true})
	    console.log('conexion en cours:'+ MONGODB_KEY )
	   
	}
	catch(e){
		 console.log('error de connexion:'+ MONGODB_KEY)
	}
}

db()
 
const schema_users={id:String,connected:{type:Boolean,Default:false},role:{type:String,Default:'admin',required:true},deni:{type:Boolean,Default:false},image:{type:String},cloud_id:{type:String},email:{type:String,required:true,unique:true},password:{type:String,required:true},fullName:{type:String,required:true},tel:{type:String},dataInsert:{type:Date,Default:Date.now}};

const schema_posts={id:String,comment:String,price:Number,title:String,image:{type:String},cloud_id:{type:String},dateInsert:{type:Date,Default:Date.now()},like:{count:Number,liked:Boolean},categorie:String,quantity:Number,total:Number};

const schema_commandes={id:String, commande:Array, author:Object, total:Number,confirm:{type:Boolean,Default:false}};
const schema_iplike={id:String,ip:String};
const schema_siteDescription={id:String,email:{type:String},first_title:String,second_title:String,cloud_id_first_image:{type:String},first_image:String,cloud_id_second_image:{type:String},second_image:String,tel:String,facebook:String,instagram:String,apropos:String,livraison:String,contact:String,fast_food:String,preparation:String,dateInsert:{type:Date}}

const schemaUsers=new mongoose.Schema(schema_users)
const schemaPosts=new mongoose.Schema(schema_posts)
const schemaCommandes=new mongoose.Schema(schema_commandes)
const schemaIplikes=new mongoose.Schema(schema_iplike)
const schemaDescriptionSite= new mongoose.Schema(schema_siteDescription);

const posts=new mongoose.model('Post',schemaPosts)

const users=new mongoose.model('User',schemaUsers)

const commandes=new mongoose.model('Commande',schemaCommandes)
const ipLikes=new mongoose.model('Iplike',schemaIplikes)
const descriptionSite=new mongoose.model('Descriptionsite',schemaDescriptionSite);

module.exports={posts:posts,users:users,commandes:commandes,ipLikes:ipLikes,descriptionSite:descriptionSite}