// deve ser passado a string contida na chave remode da mensaggem
const { writeDB, readDB } = require('../utils/fsFunction')

const addGroupPerms = async (remote) => {
  const read = await readDB();
  if (read.groupPerms.some(gp => gp === remote)) {
    return console.log('grupo já adicionado')
  }
  await writeDB("groupPerms", [...read.groupPerms, remote])
};

module.exports = {
  addGroupPerms
}