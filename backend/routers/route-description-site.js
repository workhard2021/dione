const express=require('express');
const routerDescriptionSiteWeb=express.Router();
const {ctlDescription}=require('../controller/controller-descritpion-site');
const bodyParser=require('body-parser');
const {multer_}=require('../middlerware/function')
routerDescriptionSiteWeb.post('/create',multer_.array('image',2),bodyParser.json(),ctlDescription.createSite)
routerDescriptionSiteWeb.post('/update',multer_.array('image',2),bodyParser.json(),ctlDescription.updateSite)
routerDescriptionSiteWeb.get('/delete/:id',ctlDescription.delete);
routerDescriptionSiteWeb.get('/all/',ctlDescription.all);
module.exports={routerDescriptionSiteWeb:routerDescriptionSiteWeb};