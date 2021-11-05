import axios from 'axios';

const URL = 'http://localhost:3000/tasks';

const getTasks = () => axios.get(URL).then(({ data }) => data);

const addTask = (task) => axios({
  method: 'post',
  url: URL,
  data: task,
});

const deleteTask = (id) => axios({
  method: 'delete',
  url: URL,
  data: { id },
});

const updateTask = (task) => axios({
  method: 'put',
  url: URL,
  data: task,
});

export default {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
