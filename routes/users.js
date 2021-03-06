var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
const mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('../authenticate')
const cors = require('./cors');
var router = express.Router();

router.use(bodyParser.json());
/* GET users listing. */
router.route('/')
.options(cors.corsWithOptions,(req,res) => {res.sendStatus(200)})
.get(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  console.log("Admin Verifiication ");
  if(authenticate.verifyAdmin(req.user)===false){
    console.log("Not an Admin");    
    err = new Error('Only Admins are allowed to access');
    err.status = 404;
    return next(err);
}
if(authenticate.verifyAdmin(req.user)===true){
  console.log("fetching users")
    User.find({})
    .then((users)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(users);
    },(err)=>next(err))
    .catch((err)=>next(err));
}});
/*router.route('/').get((req, res, next) => {
  
    User.find({})
    .then((users)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(users);
    },(err)=>next(err))
    .catch((err)=>next(err));
});*/
router
.options(cors.corsWithOptions,(req,res) => {res.sendStatus(200)})
.post('/signup',cors.corsWithOptions,(req, res, next) => {
  User.register(new User({username:req.body.username}),
  req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json')
      res.json({err:err});
    }
    else{
      if(req.body.firstname)
      user.firstname= req.body.firstname;
      if(req.body.lastname)
      user.lastname= req.body.lastname;
      user.save((err, user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json')
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req,res,()=>{
          res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.json({success:true,status:'Registration Successful!'});

      })
      passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.json({success:true,status:'Registration Successful!'});
      });
    });
  }
  });
});


router.post('/login',passport.authenticate('local'),(req, res, next) => {

  var token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.json({success:true,token: token,status:'Your are successfully Logged In!'});
});


router.get('/logout',(req, res, next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
  }
})
router.get('/facebook/token',passport.authenticate('facebook-token'),
(req,res)=>{
  if(req.user){
    var token = authenticate.getToken({_id:req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.json({success:true,token: token,status:'Your are successfully Logged In!'});
  }

});

module.exports = router;
