const { searchAutoComplete, current } = require('./climateEndPoints');
const db = require('../DB/FireBase');

const bot = db.collection('bot');

const setPerms = async (key, value) => {
  // exemplo -> perms: {xPerm: []}
  const resp = await bot.doc('perms').get();
  const name = key.split('P')[0];
  if (!resp.exists) {
    // cria o objeto caso não exista nada em perms
    const data = await bot.doc('perms').set({ [key]: [value] });
    return { message: `${name} adicionado`, data }
  };
  if (!(key in resp.data())) {
    // cria a chave caso não exista em perms
    const data = await bot.doc('perms')
      .update({ [key]: [value] });
    return { message: `${name} adicionado`, data }
  }
  if (resp.data()[key].includes(value)) {
    // retorna erro caso o usuario ja tenha permissao
    return { message: `Este ${name} já tem permissão`, data: {} };
  };
  const data = await bot.doc('perms')
    .update({ [key]: [...resp.data()[key], value] });
  return { message: `${name} adicionado`, data }
};

const deletePerms = async (key, value) => {
  const resp = await bot.doc('perms').get();
  if (!(key in resp.data())) {
    return { message: 'Nenhuma permissão encontrada', data: {} }
  }
  if (!resp.data()[key].includes(value)) {
    return { message: 'Permissão não encontrada', data: {} }
  }
  const data = await bot.doc('perms').update({
    [key]: [...resp.data()[key]].filter(perm => perm !== value)
  });
  return { message: `Permisão retirada`, data }

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
  climateAutoComplete,
  climateCurrent,
  deletePerms,
  setPerms
}