const request = require('request');

const apiResponseStatuses = {
    ok: 'OK',
    no_results: 'ZERO_RESULTS'
};

var geocodeAddress = (address) => {
    var encodedAddressInput = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddressInput}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(`Unable to performe a geacode request: ${error}`);
            } else if (body.status === apiResponseStatuses.no_results) {
                reject(`Unable to find address: ${address}.`);
            } else if (body.status === apiResponseStatuses.ok) {
                resolve({
                    address: body.results[0].formatted_address,
                    lattitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,
                });
            } else {
                reject('Weird stuff is happening here...');
            }
        });
    });
};

geocodeAddress('j. sütiste 34').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});
