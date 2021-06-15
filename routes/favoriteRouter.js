const express = require('express');
const bodyParser = require('body-parser');


const authenticate = require('../authenticate')
const Favorites = require('../models/favorites');
const Dishes = require('../models/dishes');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(authenticate.verifyUser,(req,res,next) =>{
        Favorites.find({'user':req.user._id})
        .populate('user')
        .populate('dishes')
        .then((favroites)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favroites);
        },(err)=>next(err))
         .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) =>{
    Favorites.findOneAndUpdate(
        {'user':req.user._id},
        {$push:{dishes:{dish:{$each:req.body}}}},
        {new:true,upsert:true}
        )
        .then((favorites)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorites); 
        },(err)=>next(err))
        .catch((err)=> next(err));
})
.put(authenticate.verifyUser,(req,res,next) => {

    res.statusCode= 403;
    res.end('PUT operation not supported');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
     Favorites.update( {'user':req.user._id},
     {$set:{dishes:[]}})
     .then((favorites) =>{
           res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorites); 
     },(err)=>next(err))
     .catch((err) => next(err));
});
favoriteRouter.route('/:favoriteId')
.post(authenticate.verifyUser,(req,res,next)=>{
    Favorites.findOneAndUpdate(
        {'user':req.user._id},
        {$push:{dishes:{dish:req.params.favoriteId}}},
        {new:true,upsert:true}
        )
        .then((favorites)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorites); 
        },(err)=>next(err))
        .catch((err)=> next(err));
})
module.exports = favoriteRouter;