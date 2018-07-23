const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather from",
            string: true
             
        }
    })
    .help()
    .alias("help", "h")
    .argv;

geocode.geocodeAdress(argv.a).then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (error) => {
    console.error(error);
});