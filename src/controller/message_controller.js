const { models } = require('../model');
const { validateServices } = require('../services');

// Controles para as pessoas não host do whatsapp

const messageController = async (msg) => {

  // verifica se foi disparado um comando ou não
  if (!validateServices.listenComand(msg.body)) return;

  // Verifica se há algum erro
  if (everyValid !== false) {
    // Retorna a mensagem de erro
    return await msg.reply(everyValid);
  }

  // Verifica se o comando foi disparado em um grupo valido;
  if (msg.body === '!everyone') {
    await commands['!everyone'](msg);
  }
}

module.exports = messageController;