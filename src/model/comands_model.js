// deve ser passado a string contida na chave remode da mensaggem
const { writeDB, readDB } = require('../utils/fsFunction');
const { searchAutoComplete, current } = require('./climateEndPoints');

// ! alterar o retorno das validações para retornarem uma mensagem para o client

const addGroupPerms = async (remote) => {
  const read = await readDB();
  if (read.groupPerms.some(gp => gp === remote)) {
    return console.log('grupo já adicionado')
  }
  await writeDB("groupPerms", [...read.groupPerms, remote])
};

const addUserPerms = async (user) => {
  // recebe o numero da pessoa 

  const read = await readDB();
  if (read.userPerms.some(userBD => userBD === user)) {
    return console.log('usuário já adicionado')
  }
  await writeDB("userPerms", [...read.userPerms, user])
}

const deleteGroupPerms = async (remote) => {
  const read = await readDB();

  if (!read.groupPerms.some(gp => gp === remote)) {
    return console.log('grupo não encontrado');
  }

  const newArrGp = [...read.groupPerms].filter(gp => gp !== remote);
  await writeDB("groupPerms", newArrGp)
}

const deleteUserPerms = async (user) => {
  const read = await readDB();

  if (!read.userPerms.some(userDB => userDB === user)) {
    return console.log('user não encontrado');
  }
  const newArrGp = [...read.userPerms].filter(userDB => userDB !== user);
  await writeDB("userPerms", newArrGp);
}

const climateAutoComplete = async (local) => {
  const req = await searchAutoComplete(local);
  return req;
};

const climateCurrent = async (local) => {
  const req = await current(local);
  return req;
}

module.exports = {
  addGroupPerms,
  addUserPerms,
  deleteGroupPerms,
  deleteUserPerms,
  climateAutoComplete,
  climateCurrent
}