const {getToDoTasks, getTask, completeTask, newTask, getAllTasks} = require('./taskList');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function grab(flag, command) {
  return command.findIndex((el) => el === flag) + 1;
}

function startProgram() {
  rl.on('line', (line) => {
    const lineSplit = line.split(' ')

    if (grab('new', lineSplit)) {
      let taskId = newTask(lineSplit[grab('new', lineSplit)]);
      process.stdout.write(`New Task was successfully added.\n${JSON.stringify(getTask(taskId))}\n\n`);
    }

    if (grab('get', lineSplit)) {
      const task = getTask(lineSplit[grab('get', lineSplit)]);

      if (task) {
        process.stdout.write(`Task # ${task.id}: ${JSON.stringify(task)}\n`);
      } else {
        process.stdout.write(`Sorry, Task #${lineSplit[grab('get', lineSplit)]} was not founded.\n`);
      }
    }

    if (grab('complete', lineSplit)) {
      const task = getTask(lineSplit[grab('complete', lineSplit)]);
      completeTask(task.id);
      process.stdout.write(`Task #${task.id} was completed!\n`);
    }

    if (grab('getToDoList', lineSplit)) {
      const list = getToDoTasks();

      list.forEach((task) => {
        process.stdout.write(`Task #${task.id}: ${JSON.stringify(task)}\n`);
      });
    }

    if (grab('help', lineSplit)) {
      fs.readFile('./help.md', 'UTF-8', (_, text) => {
        process.stdout.write(`${text}`);
      });
    }

    if (grab('getAllTasks', lineSplit)) {
      const list = getAllTasks();

      list.forEach((task) => {
        process.stdout.write(`Task #${task.id}: ${JSON.stringify(task)}\n`);
      });
    }

    if (grab('exit', lineSplit)) {
      process.exit();
    }
  });
}

process.on('exit', () => {
  process.stdout.write('Have a nice day!');
});

module.exports = {
  startProgram,
};
