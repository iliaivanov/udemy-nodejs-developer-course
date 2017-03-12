const yargs = require('yargs');
const axios = require('axios');

const apiResponseStatuses = {
    ok: 'OK',
    no_results: 'ZERO_RESULTS'
};
const config = require('./config/config.json');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address),
    geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === apiResponseStatuses.no_results) {
        throw new Error(`Unable to find that address.`);
    }

    var lattitude = response.data.results[0].geometry.location.lat,
        longitude = response.data.results[0].geometry.location.lng,
        weatherUrl = `https://api.darksky.net/forecast/${config.darksky_api_key}/${lattitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature,
        apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature - 32}. It feels like ${apparentTemperature - 32}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});
