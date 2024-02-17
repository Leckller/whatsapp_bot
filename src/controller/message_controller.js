const { comandsModel } = require('../model');
const validates = require('../services');

// Controles para as pessoas não host do whatsapp
const messageController = async (msg) => {

  // verifica se foi disparado um comando ou não
  if (validates.listenComand(msg.body)) {
    return console.log('not a command');
  } else {
    console.log('is a comand')

    const contentMsg = msg.body;
    // msg.id.remote = string de referencia ao chat
    const everyValid = await validates.allValidates(msg.id.remote, msg);
    // verifica se o chat é um grupo
    const validGroup = validates.isGroupValidate(msg.id);

    // Verifica se há algum erro
    if (everyValid !== false) {
      // Retorna a mensagem de erro
      return await msg.reply(everyValid);
    }

    if (msg.body === '+user') {
      await comandsModel.addUserPerms(msg._data.quotedParticipant);
    }
    if (msg.body === '+gp') {
      await comandsModel.addGroupPerms(msg.id.remote);
    };

    // Verifica se o comando foi disparado em um grupo valido;
    if (validGroup !== false) {
      return await msg.reply(validGroup);
    }
    if (contentMsg === '!everyone') {
      const chat = await msg.getChat();

      let text = '';
      let mentions = [];

      for (let participant of chat.participants) {
        mentions.push(`${participant.id.user}@c.us`);
        text += `@${participant.id.user} `;
      }

      await chat.sendMessage(text, { mentions });
      // Envia uma mensagem mencionando todos os integrantes do grupo
    };
  }
}

module.exports = messageController;