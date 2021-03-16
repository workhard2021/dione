
const express=require('express');
const app=express();
const cors=require('cors');
const {routerUsers}=require('./routers/router-user')
const {routerPosts}=require('./routers/router-post')
const {routerCommandes}=require('./routers/router-commande')
const {routerDescriptionSiteWeb}=require('./routers/route-description-site')
const PORT=(process.env.PORT || 8787);

if(process.env.NODE_ENV==='production'){ 
    app.use(express.static("app/build"))
}

app.use(cors());
app.use('/user',routerUsers)
app.use('/post',routerPosts)
app.use('/commande',routerCommandes);
app.use('/description-site',routerDescriptionSiteWeb)
app.listen(PORT,()=>{
	  console.log(`Server en ecoute avec port => ${PORT}`);
});
