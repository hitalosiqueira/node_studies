const request = require('request');

var weatherAt = (geocodeObj, callback) => {
    request({
        url: `http://metaweather.com/api/location/search/?lattlong=${geocodeObj.latitude},${geocodeObj.longitude}`,
        json: true
    }, (error, response, body) => {
        if (error){
            callback(error);
        }else{
            callback(undefined, body);
        }
    });
};

module.exports = {
    weatherAt
}