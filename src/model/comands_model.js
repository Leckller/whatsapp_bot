// deve ser passado a string contida na chave remode da mensaggem
const { writeDB, readDB } = require('../utils/fsFunction')

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

module.exports = {
  addGroupPerms,
  addUserPerms
}