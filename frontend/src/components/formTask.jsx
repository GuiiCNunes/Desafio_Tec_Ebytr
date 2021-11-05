import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../redux/actions';

function formTask() {
  const dispatch = useDispatch();
  const { taskToEdit } = useSelector((state) => state.tasks);

  const [task, setTask] = useState({
    content: '',
    status: '',
  });

  const [isEdit, setIsEdit] = useState();

  useEffect(() => {
    setIsEdit(Object.keys(taskToEdit).length > 0);
  }, [taskToEdit]);

  useEffect(() => {
    if (isEdit) setTask(taskToEdit);
  }, [isEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEdit) return dispatch(editTask(task));
    return dispatch(addTask(task));
  };

  const handleChange = ({ target }) => {
    setTask({
      ...task,
      [target.name]: target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content">
        Tarefa:
        <input
          type="text"
          id="content"
          value={task.content}
          name="content"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="pending">
        Pendente
        <input
          type="radio"
          id="pending"
          name="status"
          value="pending"
          checked={task.status === 'pending'}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="progress">
        Em progresso
        <input
          type="radio"
          id="progress"
          name="status"
          value="progress"
          checked={task.status === 'progress'}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="ready">
        Pronta
        <input
          type="radio"
          id="ready"
          name="status"
          value="ready"
          checked={task.status === 'ready'}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value={isEdit ? 'Editar' : 'Enviar'} />
    </form>
  );
}

export default formTask;
