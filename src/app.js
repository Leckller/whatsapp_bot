const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

class CallBot extends Client {
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
  if (msg.body === 'ping') {
    client.ping(msg.from);
  }
});

client.on('message_create', () => {

});

client.initialize();