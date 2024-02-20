const { comandsModel } = require('../model');
const validates = require('../services');

// Controles para o numero host do whatsapp
let queue = [];

const messageCreateController = async (msg) => {

  // verifica se foi disparado um comando ou não
  if (!validates.listenComand(msg.body)) {
    return;
  } else {

    const validGroup = validates.isGroupValidate(msg.id);

    if (msg.body.includes('&climate')) {
      const index = msg.body.split(' ')[1];
      if (isNaN(index) || index > queue.length) {
        return await msg.reply('Insira um valor valido')
      }
      const reqCur = await comandsModel.climateCurrent(queue[0][Number(index)].url);
      queue = [];
      return await msg.reply(`${reqCur.current.temp_c} C`);
    }

    if (msg.body.includes('!climate')) {
      if (msg.body.split(' ').length === 1) {
        return await msg.reply('Insira um local após o comando')
      }
      const local = (msg.body.split(' ')[1]).replace('-', ' ');
      const req = await comandsModel.climateAutoComplete(local);
      if (req.length === 0) {
        return await msg.reply('Nenhum resultado encontrado');
      }
      if (req.length === 1) {
        const reqCur = await comandsModel.climateCurrent(req[0].url);
        return await msg.reply(`${reqCur.current.temp_c} C`)
      }
      queue.push(req);
      const response = req.map((local, index) => `${index}: ${local.name} - ${local.region} - ${local.country}`);
      return await msg.reply(`${response} \n Digite "&climate (numeração do local)"`)
    }

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

    if (msg.body === '!everyone') {
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