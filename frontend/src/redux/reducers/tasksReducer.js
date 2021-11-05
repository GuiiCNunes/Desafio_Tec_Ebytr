import {
  GET_TASKS,
  DELETE_TASK,
  SET_ERROR,
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
    default:
      return state;
  }
};

export default tasksReducer;
