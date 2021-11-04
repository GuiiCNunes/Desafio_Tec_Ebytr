import React, { useState } from 'react';

function taskCard(dataReceiv) {
  const [data] = useState(dataReceiv);

  return (
    <article>
      <p>
        Data:
        {data.date}
      </p>
      <p>
        Tarefa:
        {data.content}
      </p>
      <p>
        Status:
        {data.status}
      </p>
      <section>
        <button type="button">Editar</button>
        <button type="button">Apagar</button>
      </section>
    </article>
  );
}

export default taskCard;
