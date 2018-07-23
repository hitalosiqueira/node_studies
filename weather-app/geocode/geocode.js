const request = require('request');

var geocodeAdress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (error, response, body)=>{
            if(error){
                reject("unable to connect into google servers");
            }else if(body.status === "ZERO_RESULTS"){
                reject("no location found");
            }else if(body.status === "OK"){
                results = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                resolve(results);
            }else{
                reject("unknown error");
            }
        });
    }); 
};

module.exports = {
    geocodeAdress
}