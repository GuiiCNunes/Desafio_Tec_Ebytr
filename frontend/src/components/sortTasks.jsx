import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortTasks as actionSort } from '../redux/actions';

function sortTasks() {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state) => state.tasks);

  const handleCLick = ({ target }) => {
    dispatch(actionSort(target.value));
  };

  return (
    <nav>
      <h3> Ordenar por: </h3>
      <label htmlFor="content-sort">
        Tarefa
        <input
          type="radio"
          id="content-sort"
          name="sort"
          value="content"
          checked={sortBy === 'content'}
          onClick={handleCLick}
        />
      </label>
      <label htmlFor="date">
        Data
        <input
          type="radio"
          id="date"
          name="sort"
          value="date"
          checked={sortBy === 'date'}
          onClick={handleCLick}
        />
      </label>
      <label htmlFor="status">
        Status
        <input
          type="radio"
          id="status"
          name="sort"
          value="status"
          checked={sortBy === 'status'}
          onClick={handleCLick}
        />
      </label>
      <label htmlFor="none">
        Nada
        <input
          type="radio"
          id="none"
          name="sort"
          value=""
          checked={sortBy === ''}
          onClick={handleCLick}
        />
      </label>
    </nav>
  );
}

export default sortTasks;
