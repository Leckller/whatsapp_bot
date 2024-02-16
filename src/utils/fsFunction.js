const path = require('path');
const fs = require('fs/promises');

const comandPath = path.resolve(__dirname, '../DB/Comands.json');

const readDB = async () => {
  const read = await fs.readFile(comandPath);
  return JSON.parse(read);
}

const writeDB = async (key, value) => {
  const read = await readDB();

  await fs.writeFile(comandPath, JSON.stringify({
    ...read,
    [key]: value
  }));

}

module.exports = {
  readDB,
  writeDB
}