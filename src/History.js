// History.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ocr/history');
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/ocr/${id}`);
      fetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>JSON Data History:</h2>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            {JSON.stringify(item)}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
