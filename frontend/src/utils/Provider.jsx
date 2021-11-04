import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [tasks, setTasks] = useState();
  const [taskToEdit, setTaskToEdit] = useState();

  const contextValue = {
    tasks,
    setTasks,
    taskToEdit,
    setTaskToEdit,
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
