const express = require('express');
const endpoints = express.Router();

endpoints.get('/', (req, res, next) => {
    res.status(200).json({
        message: "orders fetched"
    });
});

endpoints.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: "order created",
        order: order
    });
});

endpoints.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order details",
        orderId: res.params.orderId
    });
});

endpoints.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "order deleted",
        orderId: res.params.orderId
    });
});


module.exports = endpoints;