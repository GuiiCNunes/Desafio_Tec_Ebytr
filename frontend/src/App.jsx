import React from 'react';
import Provider from './utils/Provider';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
