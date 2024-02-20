const { services } = require('../services');
const { models } = require('../model');
// Controles para o numero host do whatsapp

const messageCreateController = async (msg) => {

  if (!msg.fromMe) return;
  if (!services.listenComand(msg.body)) return;

  if (msg.body.includes('!var')) {
    const get = await models.readBot('variables');
    const varName = msg.body.split(' ')[1];
    if (!varName) {
      console.log('insira um nome')
      return;
    }
    return await msg.reply(`${JSON.parse(get.data()[varName])}`);
  }

  if (msg.body.includes('+var')) {
    const params = msg.body.split(' ');
    const varName = params[1];
    const varValue = JSON.stringify(msg.body
      .slice(params[0].length + params[1].length));
    if (!varName) {
      console.log('insira um nome')
      return;
    }
    if (!varValue) {
      console.log('insira um valor')
      return;
    }
    const { message } = await models.set('variables', varName, varValue);
    await msg.reply(message);
    return;
  }

  if (msg.body.includes('!climate')) {
    const { message } = await services.validClimate(msg.body)
    return await msg.reply(message);
  }

  if (msg.body.includes('&climate') && !(msg.body.includes('"&climate'))) {
    const { message } = await services.validOptionClimate(msg.body);
    await msg.reply(message);
    return;
  }

  if (msg.body === '+user' && "quotedParticipant" in msg._data) {
    // adiciona o usuario que teve a mensagem marcada
    const cmd = await models
      .set('perms', 'userPerms', msg._data.quotedParticipant);
    console.log(cmd.message)
  }

  const GROUP = services.typeChat(msg.id).message === 'group chat';

  if (msg.body === '+gp' && GROUP) {
    // msg.id.remote = string de referencia ao chat
    await models.set('perms', 'groupPerms', msg.id.remote)
  };
  if (msg.body === '!everyone' || msg.body === '!todes' && GROUP) {
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

module.exports = messageCreateController;