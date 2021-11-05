import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormTask from '../components/formTask';
import SortTasks from '../components/sortTasks';
import taskCard from '../components/taskCard';
import { getTasks } from '../redux/actions';

function Home() {
  const dispatch = useDispatch();
  const { tasks, sortBy } = useSelector((state) => state.tasks);

  const [tasksToRender, setTasksToRender] = useState(tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    if (sortBy === '') {
      setTasksToRender(tasks);
    } else {
      setTasksToRender(tasks.sort(
        (a, b) => a[sortBy].toString().localeCompare(b[sortBy].toString()),
      ));
    }
  }, [tasks, sortBy]);

  return (
    <main>
      <section>
        { tasksToRender.map((task) => taskCard(task)) }
      </section>
      <nav>
        <FormTask />
        <SortTasks />
      </nav>
    </main>
  );
}

export default Home;
