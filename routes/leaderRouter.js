const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const leaderRouter = express.Router();
const Leaders = require('../models/leaders');
const cors = require('./cors');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res) => {res.sendStatus(200)})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
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
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
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
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 404;
    res.end("PUT not available");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
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
.options(cors.corsWithOptions,(req,res) => {res.sendStatus(200)})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
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
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {

    res.statusCode = 404;
    res.end("POST Request not available");
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
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
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
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