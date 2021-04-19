const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Fetching all the promotions ...");
})
.post((req,res,next) => {
    res.write('Creating new promotion  \n ');
    res.end("New promotion with name: "+req.body.name+" and description: "+req.body.description+" is created");
})
.put((req,res,next) => {
    res.statusCode = 404;
    res.end('PUT not supported');
})
.delete((req,res,next) => {
    res.end('Deleting all the promotions');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('COntent-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('will fetch the details for promotion: '+req.params.promoId+" to you");
})
.post((req,res,next) => {
    res.statusCode = 404;
    res.end('POST request not supported');
})
.put((req,res,next) => {
    res.write("Updating the promotion: "+req.params.promoId);
    res.end(" \n The new name is "+req.body.name+" and the new description is "+req.body.description);
})
.delete((req,res,next) => {
    res.end("Deleting promotion: "+req.params.promoId);
});

module.exports = promoRouter;