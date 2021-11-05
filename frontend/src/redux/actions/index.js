import Services from '../../services';

export const GET_TASKS = 'GET_TASKS';
export const SET_ERROR = 'SET_ERROR';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const SORT_TASKS = 'SORT_TASKS';

export const getTasks = () => async (dispatch) => {
  try {
    const response = await Services.getTasks();

    dispatch({
      type: GET_TASKS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      error,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const response = await Services.deleteTask(id);
    if (response.status !== 200) throw response.data;
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      error,
    });
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const newTask = { ...task, date: Date.now() };
    const response = await Services.addTask(newTask);
    if (response.status !== 201) throw response.data;
    dispatch({
      type: ADD_TASK,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      error,
    });
  }
};

export const setEditTask = (task) => (dispatch) => {
  try {
    dispatch({
      type: SET_EDIT_TASK,
      payload: task,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      error,
    });
  }
};

export const editTask = (task) => async (dispatch) => {
  try {
    const response = await Services.updateTask(task);
    if (response.status !== 200) throw response.data;
    dispatch({
      type: EDIT_TASK,
      payload: task,
    });
  } catch (error) {
    dispatch({
      type: EDIT_TASK,
      error,
    });
  }
};

export const sortTasks = (sort) => async (dispatch) => {
  dispatch({
    type: SORT_TASKS,
    payload: sort,
  });
};
