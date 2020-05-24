const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/users', async (req, res) => {
  try {
    const data = await readFile();
    res.send(data)
  } catch (err) {
    console.log(err);
    res.end();
  }
});

app.get('/users/:userId', async (req, res) => {
  const id = parseInt(req.params.userId);

  try {
    const data = await readFile();
    const user = JSON.parse(data).find((el) => el.id === id);

    user
      ? res.json(user)
      : res.status(400).send(`There is no user with ${req.params.userId} id`);
  } catch (err) {
    console.log(err);
    res.end();
  }
});

app.post('/users/add', async (req, res) => {
  try {
    const data = await readFile();
    const users = JSON.parse(data);
    const id = users.length + 1;
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) {
      res.status(400).send('Please provide full user information')
    } else {
      users.push({id, name, email});
      await writeFile(users);
      res.json(users);
    }
  } catch (err) {
    console.log(err);
    res.end();
  }

})

app.delete('/users/:userId', async (req, res) => {
  const id = parseInt(req.params.userId);

  try {
    const data = await readFile();
    let users = JSON.parse(data);
    const user = users.find((el) => el.id === id);

    if (user) {
      users = users.filter((el) => el.id !== id);
      res.json(`User ${user.name} was deleted`);
      await writeFile(users);
    } else {
      res.status(400).send(`There is no user with ${req.params.userId} id`);
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
});

app.listen(port);

async function readFile() {
  return fs.readFile(`${__dirname}/database/data.json`);
}

async function writeFile(content) {
  return fs.writeFile(`${__dirname}/database/data.json`, JSON.stringify(content));
}