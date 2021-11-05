import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import taskCard from '../components/taskCard';
import { getTasks } from '../redux/actions';

function Home() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <section>
        { tasks.map((task) => taskCard(task)) }
      </section>
    </main>
  );
}

export default Home;
