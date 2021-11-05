import {
  GET_TASKS,
  DELETE_TASK,
  SET_ERROR,
  SET_EDIT_TASK,
} from '../actions';

const initialState = {
  tasks: [],
  taskToEdit: {},
  error: {},
  loading: false,
};

const tasksReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        error: {},
      };
    case DELETE_TASK: {
      const newTasks = state.tasks.filter(({ _id: id }) => id !== payload);
      return {
        ...state,
        tasks: newTasks,
        error: {},
      };
    }
    case SET_ERROR:
      return {
        ...state,
        error,
      };
    case SET_EDIT_TASK:
      return {
        ...state,
        taskToEdit: payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
