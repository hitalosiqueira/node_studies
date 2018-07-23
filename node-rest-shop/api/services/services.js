const productServices = require('./product_services')

const services = {

    getAllProducts: function() {
        response = productServices.getAllProducts();
        console.log(response);
        return response;
    }
 };
 
module.exports = services;