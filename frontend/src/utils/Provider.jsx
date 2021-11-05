import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import Services from '../services';

function Provider({ children }) {
  const [tasks, setTasks] = useState();
  const [taskToEdit, setTaskToEdit] = useState();

  const addTask = async (task) => {
    const response = await Services.addTask(task);
    if (await response.status() === 201) {
      const newTask = await response.json();
      setTasks([
        ...tasks,
        newTask,
      ]);
    }
  };
  const deleteTask = async (id) => {
    const response = await Services.deleteTask(id);
    if (await response.status() === 200) {
      setTasks(tasks.filter(({ _id }) => _id.toString() !== id));
    }
  };
  const updateTask = async (task) => {
    const { _id: id } = task;
    const response = await Services.updateTask(task);
    if (await response.status() === 200) {
      const index = tasks.findIndex(({ _id }) => _id === id);
      const newArray = [...tasks];
      newArray[index] = task;
      setTasks(newArray);
    }
  };

  const contextValue = {
    tasks,
    setTasks,
    taskToEdit,
    setTaskToEdit,
    addTask,
    deleteTask,
    updateTask,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
