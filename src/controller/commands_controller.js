const commands = {
  "!everyone": async (msg) => {
    const chat = await msg.getChat();

    let text = '';
    let mentions = [];

    for (let participant of chat.participants) {
      mentions.push(`${participant.id.user}@c.us`);
      text += `@${participant.id.user} `;
    }

    await chat.sendMessage(text, { mentions });
    // Envia uma mensagem mencionando todos os integrantes do grupo
  },
  "!climate": async (msg) => {
    const local = msg.body.split(' ')[1];
    // api do tempo para consultar o clima

    const req = fetch()
  }
};

module.exports = commands;