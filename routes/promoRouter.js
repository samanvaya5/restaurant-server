const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate')
const Promotions = require('../models/promotions')
const promoRouter = express.Router();
const cors = require('./cors');
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions,(req,res) => {res.sendStatus(200)})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Promotions.find({})
    .then((promotions)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
}})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log('Promotion created',promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
    }})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 404;
    res.end('PUT not supported');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
   Promotions.remove({})
   .then((resp)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
    
},(err)=>next(err))
.catch((err) => next(err));
}});

promoRouter.route('/:promoId')
.options(cors.corsWithOptions,(req,res) => {res.sendStatus(200)})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Promotions.findById(req.params.promoId)
    .then((promotion)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
}})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {

    res.statusCode = 404;
    res.end('POST request not supported');
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
}})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
   Promotions.findByIdAndDelete(req.params.promoId)
   .then((resp)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
    
},(err)=>next(err))
.catch((err) => next(err));
}});

module.exports = promoRouter;