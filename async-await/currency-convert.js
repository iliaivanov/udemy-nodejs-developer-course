const axios = require('axios');

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to];

        if (rate) {
            return rate;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw new Error(`Unable to get exchange rate for ${from} to ${to}`);  
    };
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (error) {
        throw new Error(`Unable to get countires that use ${currencyCode}`);
    };
};

const convertCurrency = (from, to, amount) => {
    let countries;

    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;

        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });  
};

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

// getExchangeRate('USD', 'EUR').then((rate) => {
//     console.log(rate);
// });

// getCountries('USD').then((countries) => {
//     console.log(countries);
// });

convertCurrencyAlt('USD', 'EUR', 100).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err.message);
});