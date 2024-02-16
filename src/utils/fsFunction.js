const path = require('path');
const fs = require('fs/promises');

const comandPath = path.resolve(__dirname, '../DB/Comands.json');

const readDB = async () => {
  const read = await fs.readFile(comandPath);
  console.log(JSON.parse(read));
}

const writeDB = async () => {

}

module.exports = {
  readDB,
  writeDB
}