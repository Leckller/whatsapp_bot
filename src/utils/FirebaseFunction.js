const db = require('../DB/FireBase');

const setPerms = async (key, value) => {
  const req = db.collection('bot');
  const resp = await req.doc('perms').get();
  const name = key.split('P')[0];

  // cria o objeto caso não exista nada em perms
  if (!resp.exists) {
    const data = await req.doc('perms').set({ [key]: [value] });
    return { message: `${name} adicionado`, data }
  };

  // cria a chave caso não exista em perms
  if (!(key in resp.data())) {
    const data = await req.doc('perms')
      .update({ [key]: [value] });
    return { message: `${name} adicionado`, data }
  }

  // retorna erro caso o usuario ja tenha permissao
  if (resp.data()[key].includes(value)) {
    return { message: `Este ${name} já tem permissão`, data: {} };
  };

  const data = await req.doc('perms')
    .update({ [key]: [...resp.data()[key], value] });
  return { message: `${name} adicionado`, data }
};

const deletePerms = async (key, value) => {
  const req = db.collection('bot');
  const resp = await req.doc('perms').get();
  const name = key.split('P')[0];


}