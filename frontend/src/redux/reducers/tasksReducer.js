import {
  GET_TASKS,
  DELETE_TASK,
  SET_ERROR,
  SET_EDIT_TASK,
  ADD_TASK,
  EDIT_TASK,
  SORT_TASKS,
} from '../actions';

const initialState = {
  tasks: [],
  taskToEdit: {},
  error: {},
  loading: false,
  sortBy: '',
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
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
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
    case EDIT_TASK: {
      const { _id: id } = payload;
      return {
        ...state,
        tasks: state.tasks.map(
          (task) => {
            const { _id } = task;
            return _id === id ? payload : task;
          },
        ),
      };
    }
    case SORT_TASKS:
      return {
        ...state,
        sortBy: payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
