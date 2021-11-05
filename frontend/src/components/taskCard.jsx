import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions';

function taskCard(dataReceiv) {
  const dispatch = useDispatch();
  const { _id: id } = dataReceiv;

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  return (
    <article>
      <p>
        Data:
        {dataReceiv.date}
      </p>
      <p>
        Tarefa:
        {dataReceiv.content}
      </p>
      <p>
        Status:
        {dataReceiv.status}
      </p>
      <section>
        <button type="button">Editar</button>
        <button type="button" onClick={handleDelete}>Apagar</button>
      </section>
    </article>
  );
}

export default taskCard;
