require('dotenv').config();
const db = require('../DB/FireBase');

const KEY = process.env.KEY;
const bot = db.collection('bot');

const readBot = async (document) => {
  const require = await bot.doc(document).get();
  return require;
}

const set = async (document, key, value) => {
  // exemplo -> perms: {xPerm: []}
  const getDB = await readBot(document);
  const name = key.split('P')[0];

  if (!getDB.exists) {
    // cria o objeto caso não exista nada em [document]
    const data = await bot.doc(document).set({ [key]: [value] });
    return { message: `${name} adicionado | doc`, data }
  };
  if (!(key in getDB.data())) {
    // cria a chave caso não exista em [document]
    const data = await bot.doc(document)
      .update({ [key]: [value] });
    return { message: `${name} adicionado | key`, data }
  }
  if (getDB.data()[key].includes(value)) {
    // retorna erro caso o usuario ja tenha permissao
    return { message: `Este ${name} já tem permissão`, data: {} };
  };

  const data = await bot.doc(document)
    .update({ [key]: [...getDB.data()[key], value] });
  return { message: `${name} adicionado`, data }
}
// code smell abaixo

// const setPerms = async (key, value) => {
//   // exemplo -> perms: {xPerm: []}
//   const resp = await bot.doc('perms').get();
//   const name = key.split('P')[0];
//   if (!resp.exists) {
//     // cria o objeto caso não exista nada em perms
//     const data = await bot.doc('perms').set({ [key]: [value] });
//     return { message: `${name} adicionado`, data }
//   };
//   if (!(key in resp.data())) {
//     // cria a chave caso não exista em perms
//     const data = await bot.doc('perms')
//       .update({ [key]: [value] });
//     return { message: `${name} adicionado`, data }
//   }
//   if (resp.data()[key].includes(value)) {
//     // retorna erro caso o usuario ja tenha permissao
//     return { message: `Este ${name} já tem permissão`, data: {} };
//   };
//   const data = await bot.doc('perms')
//     .update({ [key]: [...resp.data()[key], value] });
//   return { message: `${name} adicionado`, data }
// };

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
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${KEY}&q=${local}`);
  const data = await response.json();
  return data;
};

const climateCurrent = async (local, days = 3) => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${local}&days=${days}&aqi=no&alerts=no`);
  const data = await response.json();
  return data;
}

module.exports = {
  climateAutoComplete,
  climateCurrent,
  deletePerms,
  set
}