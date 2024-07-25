import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChalesList from './components/ChaleList';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fazer requisição para o backend
    axios.get('http://localhost:3001/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do servidor:', error);
      });
  }, []);

  return (
    <div className="App">
      <ChalesList />
    </div>
  );
}

export default App;
