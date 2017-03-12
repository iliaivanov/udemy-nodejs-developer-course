const request = require('request');

const apiResponseStatuses = {
    ok: 'OK',
    no_results: 'ZERO_RESULTS'
};

var geocodeAddress = (address, callback) => {
    var encodedAddressInput = encodeURIComponent(address),
        result = {
            address: undefined,
            message: undefined,
            success: false
        };

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddressInput}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            result.message = `Unable to performe a geacode request: ${error}`;
        } else if (body.status === apiResponseStatuses.no_results) {
            result.message = `Unable to find address: ${address}.`;
        } else if (body.status === apiResponseStatuses.ok) {
            result.message = 'Address geocode found.';
            result.address = {
                address: body.results[0].formatted_address,
                lattitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
            };
            result.success = true;
        } else {
            result.message = 'Weird stuff is happening here...';
        }

        callback(result);
    });
};

module.exports.geocodeAddress = geocodeAddress;
