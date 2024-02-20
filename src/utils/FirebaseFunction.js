const db = require('../DB/FireBase');

const setPerms = async (key, value) => {
  const req = db.collection('bot');
  const resp = await req.doc('perms').get();

  if (!resp.exists) {
    return await req.doc('perms').set({
      [key]: [value]
    });
  }

  if (resp.data()[key].includes(value)) {
    return { status: error };
  }

  return await req.doc('perms').update({
    [key]: [...resp.data()[key], value]
  });

};

setPerms('userPerms', 'ruy')