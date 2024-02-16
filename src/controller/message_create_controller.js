const { comandsModel } = require('../model');
const validates = require('../services');

// Controles para o numero host do whatsapp
const messageCreateController = async (msg) => {
  // verifica se foi disparado um comando ou não
  const validGroup = await validates.isGroupValidate(msg.id);

  if (validates.listenComand(msg.body)) {
    return console.log('not a command');
  } else {
    const contentMsg = msg.body;
    console.log('is a comand')
    // se quotedParticipant existir significa que o comando foi chamado na resposta de outra mensagem, então este usuario da mensagem marcada recebe permissoes para utilizar o bot (quotedParticipant = numero da pessoa)

    // também funcionaria se fosse enviado o numero da pessoa mas dessa forma fica mais simples de adicionar permissão para alguem
    if (msg.body === '+user' && "quotedParticipant" in msg._data) {
      await comandsModel.addUserPerms(msg._data.quotedParticipant);
    }

    if (msg.body === '+gp') {
      // msg.id.remote = string de referencia ao chat
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
};

module.exports = messageCreateController;