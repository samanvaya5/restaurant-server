const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain')
    next();
})
.get((req,res,next) => {
    res.end("Will send details of all the leaders");
})
.post((req,res,next) => {
    res.write("Creating new leader ")
    res.end("The name of new leader is"+req.body.name+" and the description is "+req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 404;
    res.end("PUT not available");
})
.delete((req,res,next) => {
    res.end("Deleting all the leaders");
});

leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode =200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Will send details of the leader: "+req.params.leaderId);
})
.post((req,res,next) => {
    res.statusCode = 404;
    res.end("POST Request not available");
})
.put((req,res,next) => {
    res.write("Updating leader: "+req.params.leaderId);
    res.end("\n The new name is "+req.body.name+" and the new description is "+req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting the leader: "+req.params.leaderId);
});

module.exports =leaderRouter;