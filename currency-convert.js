// USD, CAD, 20
// 20 USD is worth 26CAD. You can spend these in the following countries: Canada, ...

// http://data.fixer.io/api/latest?access_key=14cdb1610f6c8ddb230fe439b236e030&format=1
require('isomorphic-fetch');
const axios = require('axios');

// Promise based 
// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=14cdb1610f6c8ddb230fe439b236e030&format=1')
//         .then((response) => {
//             const euro = 1/response.data.rates[from];
//             const rate = euro * response.data.rates[to];
//             return rate;
//             console.log(response);
//             // return response;
//         })
// }


// Async Await Version with axios
// const getExchangeRate = async (from, to) => {
//     const response = await axios.get('http://data.fixer.io/api/latest?access_key=14cdb1610f6c8ddb230fe439b236e030&format=1');
//     const euro = 1/response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
// }

// Async Await Version with Fetch API
const getExchangeRate = async (from, to) => {

    try {
        const response = await fetch('http://data.fixer.io/api/latest?access_key=14cdb1610f6c8ddb230fe439b236e030&format=1');
        const responseJson = await response.json();
    
        const euro = 1/responseJson.rates[from];
        const rate = euro * responseJson.rates[to];

        if(isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`)
    }
}

// https://restcountries.eu/rest/v2/currency/usd

// Promise based Version with axios
// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
//         .then((response) => {
//             return response.data.map((country) => {
//                 return country.name;
//             })
//         });
// }

// Async Await Version with axios
// const getCountries = async (currencyCode) => {
//     const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
//     return response.data.map((country) => {
//         return country.name;
//     })
// }

// Async Await Version with FETCH API
const getCountries = async (currencyCode) => {
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        const responseJson = await response.json();

        return responseJson.map((country) => {
            return country.name;
        })
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
}

// Promise based 
// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (rate * amount).toFixed(2);
//         console.log(convertedAmount);
//         return getCountries(to);
//     }).then((countries) => {
//         console.log(countries);
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend in the following countries: ${countries.join(', ')}`;
//     }); 
// }

// Async Await Version
const convertCurrency = async (from, to, amount) => {
    const exchangeRateResponse = await getExchangeRate(from, to);
    const convertedAmount = (exchangeRateResponse * amount).toFixed(2);
    const getCountriesResponse = await getCountries(to);
    // console.log(getCountriesResponse);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend in the following countries: ${getCountriesResponse.join(', ')}`;
}

// getExchangeRate('SGD', 'MYR').then((rate) => {
//     console.log(rate);
// });

// getCountries('SGD').then((countries) => {
//     console.log(countries);
// })

convertCurrency('SGD','MYR',40).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});


// const add = async (a, b) => {
//     return a + b + c;
// }

// const doWork = async () => {
//     try {
//         const result = await add(12, 13);
//         return result;
//     } catch (e) {
//         return 10;
//     }
// }

// doWork().then((data) => {
//     console.log(data);
// }).catch((e) => {
//     console.log('Something went wrong!');
// });