const dotenv = require('dotenv');
const btoa = require('btoa');

dotenv.config();

const appEnvVars = {};

const envKeys = Object.keys(process.env);

envKeys
  .filter((key) => key.startsWith('APPENV__'))
  .map((key) => key.substring(8))
  .forEach((key) => {
    appEnvVars[key] = process.env['APPENV__' + key].trim();
  });

module.exports = () => {
  return {
    code:
      'module.exports = ' + JSON.stringify(btoa(JSON.stringify(appEnvVars))),
  };
};
