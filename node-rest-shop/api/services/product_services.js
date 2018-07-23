const Product = require('../model/products');

const product_services = {

    getAllProducts: function () {
        console.log(Product.find());
        Product
            .find()
            .select("name price _id")
            .exec()
            .then(docs => {
                console.log(docs);
                return {
                    count: docs.length,
                    products: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8000/products/' + doc._id
                            }
                        }
                    })
                };
            })
            .catch(error => {
                console.log(500).json({
                    error: error
                });
            });
    }
};

module.exports = product_services;