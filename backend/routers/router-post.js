const express=require('express');
const routerPosts=express.Router();
const {ctlPosts}=require('../controller/controller-posts');
const bodyParser=require('body-parser');
const {multer_}=require('../middlerware/function')

routerPosts.get('/all/',ctlPosts.all)//fait
routerPosts.post('/create/',multer_.array('image',1),bodyParser.json(),ctlPosts.create)//fait
routerPosts.post('/update/',multer_.array('image',1),bodyParser.json(),ctlPosts.update)//fait
routerPosts.get('/like/:id',ctlPosts.like)//fait
routerPosts.get('/search/:motif',ctlPosts.search)
routerPosts.get('/delete-all/',ctlPosts.deleteAll)//fait
routerPosts.get('/find/:id',ctlPosts.findOne)//fait
routerPosts.get('/delete/:id',ctlPosts.delete)//fait

module.exports={routerPosts:routerPosts};