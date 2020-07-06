const fs = require('fs').promises;

async function getUsers() {
  const data = await fs.readFile(`${__dirname}/users.json`);
  return JSON.parse(data);
}

async function writeUsers(content) {
  return fs.writeFile(`${__dirname}/users.json`, JSON.stringify(content));
}

module.exports = {
  getUsers,
  writeUsers,
};
