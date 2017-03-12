const request = require('request');
const config = require('../../config/config.json');

var locationWeather = (lattitude, longitude, callback) => {
    var result = {
            currently: undefined,
            message: undefined,
            success: false
        };

    request({
        url: `https://api.darksky.net/forecast/${config.darksky_api_key}/${lattitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            result.message = 'Weather data fetched.';
            result.currently = body.currently;
            result.success = true;
        } else {
            result.message = 'Unable to fetch weather data.';
        }

        callback(result);
    });
};

module.exports.locationWeather = locationWeather;
