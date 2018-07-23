const express = require('express');
const endpoints = express.Router();
const mongoose = require('mongoose');
const services = require('../services/services');

endpoints.get('/', (req, res, next) => {
    response = services.getAllProducts();
    res.status(200).json(response);
});

endpoints.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(doc => {
            console.log(doc);
            if(doc){
                const response = {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: 'http://localhost:8000/products/' + doc._id
                    }
                };
                res.status(200).json(response);
            }else{
                res.status(404).json({
                    message: "Not found essa porra"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

endpoints.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({
        _id: id
    },
    {
        $set: updateOps
    })
    .then(result => {
        console.log(result);
        const response = {
            message: "product updated",
            request: {
                type: "GET",
                url: "http://localhost:8000/products/" + id
            }
        };
        res.status(200).json(response)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error})
    });
});


endpoints.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({
        _id: id
    })
    .then(result => {
        res.status(200).json({
            message: "product deleted"
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

endpoints.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:  req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            const response = {
                message: "Created product",
                product: {
                    name: result.name,
                    price: result.price,
                    __id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/products/' + result._id
                    }
                }
            };
            res.status(201).json(response);
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

module.exports = endpoints;