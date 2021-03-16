const express=require('express');
const routerUsers=express.Router();
const {ctlUsers}=require('../controller/controller-users');
const bodyParser=require('body-parser');
const {multer_}=require('../middlerware/function')

routerUsers.get('/all',ctlUsers.all) //fait
routerUsers.post('/create',multer_.array('image',1),bodyParser.json(),ctlUsers.createUser)
routerUsers.post('/update/',multer_.array('image',1),bodyParser.json(),ctlUsers.updateUser)
routerUsers.post('/connexion/',bodyParser.json(),ctlUsers.connexion)
routerUsers.post('/deconnexion/',bodyParser.json(),ctlUsers.deconnexion)
routerUsers.get('/deni/:id',ctlUsers.deniUser)
routerUsers.post('/deni-all/',bodyParser.json(),ctlUsers.deniAllUser)
routerUsers.post('/password-forget/',bodyParser.json(),ctlUsers.resetPassword)
routerUsers.post('/password-forget/',bodyParser.json(),ctlUsers.resetPassword)
routerUsers.post('/password-forget-connect/',bodyParser.json(),ctlUsers.connectionPasswordForget)
routerUsers.post('/delete-compte/',bodyParser.json(),ctlUsers.deleteUser)
routerUsers.get('/search/:motif',ctlUsers.search)
routerUsers.get('/delete-all/',ctlUsers.deleteAll)
routerUsers.get('/delete/:id',ctlUsers.delete)
routerUsers.get('/find:id',ctlUsers.findOne)

module.exports={routerUsers:routerUsers};