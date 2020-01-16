const NodeGeocoder = require('node-geocoder');
const config = require('config');

/**
 * Per ottenere l' `apiKey`
 * iscriversi su `https://developer.mapquest.com/ per ottenere`
 * e nella sezione `https://developer.mapquest.com/user/me/apps`
 * copiare il valore di `Consumer Key`
 *
 * Le prop 'provider' e 'apiKey' sono caricate dal file 'config/default.json'
 */

const provider = config.get('GEOCODER_PROVIDER');
const apiKey = config.get('GEOCODER_API_KEY');

// console.log('provider', provider);
// console.log('apiKey', apiKey);

const options = {
  provider: provider,
  httpAdapter: 'https',
  apiKey: apiKey,
  formatter: null
};

///
// const options = {
//   provider: process.env.GEOCODER_PROVIDER,
//   httpAdapter: 'https',
//   apiKey: process.env.GEOCODER_API_KEY,
//   formatter: null
// };

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
