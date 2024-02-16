const { readDB } = require("../utils/fsFunction");

const groupValidate = async (remote) => {
  const { groupPerms } = await readDB();

  // Procura se existe o grupo no banco de dados

  const groupValidate = groupPerms.some(gp => gp === remote);
  return groupValidate;
}

module.exports = {
  groupValidate
}