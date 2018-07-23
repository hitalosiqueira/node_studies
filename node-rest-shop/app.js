const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productEndpoints = require('./api/endpoints/products_endpoints');
const orderEndpoints = require('./api/endpoints/order_endpoints');

mongoose.connect(
    "mongodb+srv://hsiqueira:" + process.env.MONGO_ATLAS_PW + "@clusterhitalo-s3fmq.mongodb.net/test?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Controle-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productEndpoints);
app.use('/orders', orderEndpoints);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:({
            message: error.message
        })
    })
});

module.exports = app;