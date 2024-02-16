const messageModel = async (message) => {
  const msg = message.body;

  if (msg === '!everyone') {
    const chat = await message.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  };

  if (msg.includes(' ruy ') || msg.includes(' gu ')) {
    const name = message._data.notifyName;
    if (name === 'Morghana') {
      return await message.reply('oi amor')
    }
    await message.reply(`oi ${message._data.notifyName}`);
  }
}

module.exports = messageModel;