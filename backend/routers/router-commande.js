const express=require('express');
const routerCommandes=express.Router();
const {ctlcommandes}=require('../controller/controller-commande');
const bodyParser=require('body-parser');

routerCommandes.get('/all',ctlcommandes.all)
routerCommandes.post('/create',bodyParser.json(),ctlcommandes.createCommande)
routerCommandes.get('/confirm/:id',ctlcommandes.confirm)
routerCommandes.get('/search/:motif',ctlcommandes.search)
routerCommandes.get('/delete-all/',ctlcommandes.deleteAll_)

routerCommandes.get('/delete/:id',ctlcommandes.delete)
routerCommandes.get('/find/:id',ctlcommandes.findOne)

module.exports={routerCommandes:routerCommandes};