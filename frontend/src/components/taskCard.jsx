import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, setEditTask } from '../redux/actions';

function taskCard(task) {
  const dispatch = useDispatch();
  const { _id: id } = task;

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  const handleEdit = () => {
    dispatch(setEditTask(task));
  };

  return (
    <article>
      <p>
        Data:
        {task.date}
      </p>
      <p>
        Tarefa:
        {task.content}
      </p>
      <p>
        Status:
        {task.status}
      </p>
      <section>
        <button type="button" onClick={handleEdit}>Editar</button>
        <button type="button" onClick={handleDelete}>Apagar</button>
      </section>
    </article>
  );
}

export default taskCard;
