const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const leaderRouter = express.Router();
const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },(err)=>next(err))
     .catch((err) => next(err));
   
}})
.post(authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Leaders.create(req.body)
    .then((leader)=>{
        console.log('Leader Created',leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err) => next(err));
    
}})
.put(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 404;
    res.end("PUT not available");
})
.delete(authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
        
    },(err)=>next(err))
    .catch((err) => next(err));
}});

leaderRouter.route('/:leaderId')
.get(authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
}})
.post(authenticate.verifyUser,(req,res,next) => {

    res.statusCode = 404;
    res.end("POST Request not available");
})
.put(authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
     .catch((err) => next(err));    
}})
.delete(authenticate.verifyUser,(req,res,next) => {
    if(authenticate.verifyAdmin(req.user)==false){
        
        err = new Error('Only Admins are allowed to access');
        err.status = 404;
        return next(err);
    }
    if(authenticate.verifyAdmin(req.user)==true){
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
        
    },(err)=>next(err))
    .catch((err) => next(err));
}});

module.exports =leaderRouter;