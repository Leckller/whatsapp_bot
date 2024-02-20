const { models } = require('../model');
const fila = require('../utils/queue');

const listenComand = (msg) => {
  // deve receber o conteudo da mensagem
  const validComands = ['+user', '+gp', '!todes', '!everyone', '+var', '!climate', '&climate']
  const isCommand = validComands.some(cmd => cmd === msg.split(' ')[0])
  // retorna true caso seja um comando e falso caso seja uma mensagem normal
  return isCommand;
}

// usuario valido, grupo valido, comando valido no chat

const typeChat = (idObj) => {
  if ("participant" in idObj) {
    return { message: 'group chat' }
  }
  return { message: 'private chat' }
}

const validClimate = async (msg) => {
  if (msg.split(' ').length === 1) {
    return { message: 'Insira um local após o comando' }
  }

  const local = (msg.split(' ')[1]).replace('-', ' ');
  const req = await models.climateAutoComplete(local);

  if (req.length === 0) {
    return { message: 'Nenhum resultado encontrado' }
  }

  if (req.length === 1) {
    const reqCurrent = await models.climateCurrent(req[0].url);
    return {
      message: `
      Tempo em ${reqCurrent.location.name}\n
      Condição ${reqCurrent.current.condition.text}\n
      Temperadura de ${reqCurrent.current.temp_c} ºC\n
      Sensação de ${reqCurrent.current.feelslike_c} ºC\n
      `, img: 'https:' + reqCurrent.current.condition.icon
    }
  }
  fila.addQueue(req);
  const response = req.map((local, index) =>
    `${index}: ${local.name} - ${local.region} - ${local.country} \n`).join('');
  return { message: `${response} \nDigite "&climate (numero do local)"` }
}

const validOptionClimate = async (msg) => {
  const index = msg.split(' ')[1];
  if (isNaN(index) || index > fila.peek().length) {
    return { message: 'Insira um valor valido' }
  }
  const reqCurrent = await models.climateCurrent(fila.peek()[Number(index)].url);
  fila.deleteFirts();
  return {
    message: `
    Tempo em ${reqCurrent.location.name}\n
    Condição ${reqCurrent.current.condition.text}\n
    Temperadura de ${reqCurrent.current.temp_c} ºC\n
    Sensação de ${reqCurrent.current.feelslike_c} ºC\n
    `, img: 'https:' + reqCurrent.current.condition.icon
  };
}

module.exports = {
  listenComand,
  typeChat,
  validClimate,
  validOptionClimate
};