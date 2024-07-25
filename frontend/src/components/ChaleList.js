import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChalesList = () => {
  const [chales, setChales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChales = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/chales');
        setChales(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchChales();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Chalés</h1>
      <ul>
        {chales.map((chale) => (
          <li key={chale.id}>{chale.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChalesList;
