const { models } = require('../model');
const fila = require('../utils/queue');
const climateUtil = require('../utils/climateUtil');

const listenComand = (msg) => {
  // deve receber o conteudo da mensagem
  const validComands = ['+user', '+gp', '!var', '!todes', '!everyone', '+var', '!climate', '&climate']
  if (typeof msg === 'object') {
    return;
  }
  const input = msg.split(' ')[0];
  const isCommand = validComands.some(cmd => cmd === input)
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

  const local = msg.slice(msg.split(' ')[0].length + 1);
  const req = await models.climateAutoComplete(local);

  if (req.length === 0) {
    return { message: 'Nenhum resultado encontrado' }
  }

  if (req.length === 1) {
    return await climateUtil(req[0].url);
  }

  const secondCmd = local.slice(local.length - 1);
  if (secondCmd && req.length > 1 && !isNaN(secondCmd)) {
    return await climateUtil(req[0].url);
  }

  fila.addQueue(req);
  setTimeout(() => {
    fila.deleteFirts();
  }, 30000);

  const response = req.map((local, index) =>
    `${index}: ${local.name} - ${local.region} - ${local.country} \n`).join('');
  return { message: `${response} \nDigite "&climate (numero do local)"\nAs opções expiram em 30s` }
}

const validOptionClimate = async (msg) => {
  if (fila.isEmpty()) {
    return { message: "Nenhuma opção disponível" };
  }

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
    Temperatura de ${reqCurrent.current.temp_c} ºC\n
    Sensação de ${reqCurrent.current.feelslike_c} ºC\n
    `, img: 'https:' + reqCurrent.current.condition.icon
  };
}

const validCallVar = async (msg) => {
  const get = await models.readBot('variables');
  const varName = msg.split(' ')[1];
  if (!varName) {
    return { message: 'insira um nome' };
  }
  if (!(varName in get.data())) {
    return { message: `A variavel ${varName} não existe` }
  }
  return { message: `${JSON.parse(get.data()[varName])}` };
}

const validAddVar = async (msg) => {
  const params = msg.split(' ');
  const varName = params[1];
  const size = params[0].length + params[1].length + 2;
  const varValue = JSON.stringify(msg.slice(size));

  if (!varName) {
    return { message: '* Insira um nome para a variavel' };
  }
  if (!varValue) {
    return { message: '* Insira um valor para a variavel' };
  }
  const { message } = await models
    .set('variables', varName, varValue, false);
  return { message };
}

const validPerm = async (permType, perm) => {
  const read = await models.readBot('perms');
  const verify = read.data()[permType].includes(perm);
  return verify;
}

module.exports = {
  listenComand,
  typeChat,
  validClimate,
  validOptionClimate,
  validAddVar,
  validCallVar,
  validPerm
};