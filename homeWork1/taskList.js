let taskList = [];

function getToDoTasks() {
  return taskList.filter(({status}) => status === 'TODO');
}

function getAllTasks() {
  return taskList;
}

function getTask(taskId) {
  return taskList.find(({id}) => id == taskId);
}

function completeTask(id) {
  taskList = taskList.map((task) => {
    return task.id == id
      ? {...task, status: 'COMPLETED'}
      : task;
  })
}

function newTask(name) {
  return taskList.push({
    id: taskList.length + 1,
    name,
    status: 'TODO',
  })
}

module.exports = {
  getToDoTasks,
  getTask,
  completeTask,
  newTask,
  getAllTasks,
};
