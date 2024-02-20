
const listenComand = (msg) => {
  // deve receber o conteudo da mensagem
  const validComands = ['+user', '+gp', '!everyone', '+var', '!climate', '&climate']
  const isCommand = validComands.some(cmd => cmd === msg.split(' ')[0])
  // retorna true caso seja um comando e falso caso seja uma mensagem normal
  return isCommand;
}

// usuario valido, grupo valido, comando valido no chat



module.exports = {
  listenComand
};