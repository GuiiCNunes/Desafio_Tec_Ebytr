const URL = 'localhost:3000/tasks';

const getTasks = () => fetch(URL).then((data) => data.json());

const addTask = (task) => fetch(URL, {
  method: 'POST',
  body: task,
});

const deleteTask = (id) => fetch(URL, {
  method: 'DELETE',
  body: id,
});

const updateTask = (task) => fetch(URL, {
  method: 'PUT',
  body: task,
});

export default {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
