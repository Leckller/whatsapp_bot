const messageCreateController = async (msg) => {
  const content = msg.body;

  if (msg.id.remote === "5521994288388-1563854145@g.us") {
    console.log('its a brodal msg: ' + content)
  } if (msg.id.remote !== "5521994288388-1563854145@g.us") {
    console.log('its not a brodal msg: ' + content)
  }

  if (msg === '!everyone' && msg.fromMe) {
    const chat = await msg.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  }
};

module.exports = messageCreateController;