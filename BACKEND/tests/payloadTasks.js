const example_id = '6182fdfbfe472f160bc37e6e';

const taskToDb = {
  content: 'Make a beatiful task',
  date: Date.now(),
  status: 'pending',
};

const taskToDbWithOutStatus = {
  content: 'Make a beatiful task',
  date: Date.now(),
  status: 'launch',
};

const taskReturnedForDb = {
  _id: '6182fdfbfe472f160bc37e6e',
  status: 'pending',
  content: 'Make a beatiful task',
  date: 1635974651743,
};

const allTasks = [
  taskReturnedForDb,
  taskReturnedForDb,
  taskReturnedForDb,
];

module.exports = {
  taskToDb,
  taskReturnedForDb,
  taskToDbWithOutStatus,
  allTasks,
  example_id,
};
