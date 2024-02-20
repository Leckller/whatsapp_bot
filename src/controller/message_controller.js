const { services } = require('../services');

// Controles para as pessoas não host do whatsapp

const messageController = async (msg) => {

  // verifica se foi disparado um comando ou não
  if (!services.listenComand(msg.body)) return;

  if (msg.body.includes('!climate')) {
    const { message } = await services.validClimate(msg.body)
    return await msg.reply(message);
  }

  if (msg.body.includes('&climate') && !(msg.body.includes('"&climate'))) {
    const { message } = await services.validOptionClimate(msg.body);
    await msg.reply(message);
    return;
  }

  const GROUP = services.typeChat(msg.id).message === 'group chat';

  if (msg.body === '!todes' || msg.body === '!everyone' && GROUP) {
    // Envia uma mensagem mencionando todos os integrantes do grupo
    const chat = await msg.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  };
}

module.exports = messageController;