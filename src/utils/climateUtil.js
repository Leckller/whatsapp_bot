const { models } = require("../model");

const climateUtil = async (url) => {
  const reqCurrent = await models.climateCurrent(url);
  return {
    message: `
      Tempo em ${reqCurrent.location.name}\n
      Condição ${reqCurrent.current.condition.text}\n
      Temperatura de ${reqCurrent.current.temp_c} ºC\n
      Sensação de ${reqCurrent.current.feelslike_c} ºC\n
      `, img: 'https:' + reqCurrent.current.condition.icon
  }
}

module.exports = climateUtil