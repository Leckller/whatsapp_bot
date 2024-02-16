const comands = require('./comands_controller');

const messageController = async (msg) => {
  const contentMsg = msg.body;

  if (msg.id.remote === "5521994288388-1563854145@g.us") {
    console.log('its a brodal msg: ' + msg)
  } if (msg.id.remote !== "5521994288388-1563854145@g.us") {
    console.log('its not a brodal msg: ' + msg)
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
  };

  if (contentMsg.includes(' ruy ') || contentMsg.includes(' gu ')) {
    const name = msg._data.notifyName;
    if (name === 'Morghana') {
      return await msg.reply('oi amor')
    }
    await msg.reply(`oi ${msg._data.notifyName}`);
  }
}

module.exports = messageController;