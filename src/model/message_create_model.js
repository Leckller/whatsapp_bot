const messageCreateModel = async (message) => {
  const msg = message.body;

  if (msg === '!everyone' && message.fromMe) {
    const chat = await message.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  }
};

module.exports = messageCreateModel;