import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DBtest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>MySQL Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.countryID}>{item.countryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default DBtest;
