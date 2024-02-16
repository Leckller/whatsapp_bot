const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
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

  if (msg.includes('ruy') || msg.includes('gu')) {
    const name = message._data.notifyName;
    if (name === 'Morghana') {
      return await message.reply('oi amor')
    }
    await message.reply(`oi ${message._data.notifyName}`);
  }

});

client.on('message_create', async (message) => {
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
});

client.on('message_reaction', async (message) => {
  const { reaction, msgId: { fromMe } } = message;

});

client.initialize();
