const validateServices = require('./validateService');
const climates = require('./climateEndPoints');

module.exports = {
  ...validateServices,
  climates
}