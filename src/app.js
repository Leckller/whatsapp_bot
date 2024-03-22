const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

class CallBot extends Client {
  async everyone(chatId) {
    const chat = await super.getChatById(chatId);

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
  }

  ping(chatId) {
    super.sendMessage(chatId, 'pong');
  }
}

const client = new CallBot({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Cliente está pronto!');
});


client.on('message', (msg) => {
  const { body } = msg;
  if (body === 'ping') client.ping(msg.from);
  if (body === '!everyone') client.everyone(msg.from);

});

client.on('message_create', () => {

});

client.initialize();