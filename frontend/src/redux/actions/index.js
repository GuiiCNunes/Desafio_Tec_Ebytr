import Services from '../../services';

export const GET_TASKS = 'GET_TASKS';
export const SET_ERROR = 'SET_ERROR';
export const DELETE_TASK = 'DELETE_TASK';

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
