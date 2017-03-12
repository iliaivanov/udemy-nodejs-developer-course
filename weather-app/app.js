const yargs = require('yargs');
const geocode = require('./src/geocode/geocode');
const weather = require('./src/weather/weather');

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

geocode.geocodeAddress(argv.a, (location) => {
    if (location.success) {
        weather.locationWeather(location.address.lattitude, location.address.longitude, (weather) => {
            if (weather.success) {
                console.log(`It is ${(weather.currently.temperature - 32)} in ${location.address.address}, but it feels like ${(weather.currently.apparentTemperature - 32)}.`);
            } else {
                console.log(weather.message);
            }
        });
    } else {
        console.log(location.message);
    }
});
