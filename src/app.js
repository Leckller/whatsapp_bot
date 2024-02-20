const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { messageController, messageCreateController } = require('./controller');
const { services } = require('./services');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', messageController);

// caso queira enviar fotos deverá ser implementado
// aqui, caso contrario o node não vai permitir usar o client

client.on('message_create', messageCreateController);

client.initialize();