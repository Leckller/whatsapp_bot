const { readDB } = require("../utils/fsFunction");

const listenComand = (msg) => {
  // deve receber o conteudo da mensagem
  const validComands = ['+user', '+gp', '!everyone', '+var']
  const isCommand = validComands.some(cmd => cmd === msg)
  // retorna true caso seja um comando e falso caso seja uma mensagem normal
  return isCommand;
}

const groupValidate = async (remote) => {
  const { groupPerms } = await readDB();

  // Procura se existe o grupo no banco de dados
  const groupValidate = groupPerms.some(gp => gp === remote);
  return groupValidate;
};

const userValidate = async (user) => {
  const { userPerms } = await readDB();

  // Procura se existe o usuário no banco de dados
  const userValidate = userPerms.some(userDB => userDB === user);
  return userValidate;
};

const isGroupValidate = (id) => {
  // id é um objeto de _data ou message
  if (!("participant" in id)) {
    return '* Este comando funciona apenas em grupos'
  }
  // retorna falso caso seja um grupo
  return false;
};

const allValidates = async (remote, user) => {
  const validGp = await groupValidate(remote);
  const validUser = await userValidate(user);

  if (!validUser) {
    return '* Você não tem permissão para usar este comando'
  };
  if (!validGp) {
    return '* Este grupo não tem permissão para usar este comando';
  };
  // retorna falso caso todas as validações passem
  return false;
};


module.exports = {
  groupValidate,
  userValidate,
  allValidates,
  isGroupValidate,
  listenComand
};