import React, { useState } from 'react';
import { fetchNumbers } from './apiService';

const AverageCalculator = () => {
  const [id, setId] = useState('');
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [average, setAverage] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetchNumbers(id);
    if (data) {
      setWindowPrevState(data.windowPrevState);
      setWindowCurrState(data.windowCurrState);
      setAverage(data.avg);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number ID (p/f/e/r):
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </label>
        <button type="submit">Calculate</button>
      </form>
      <div>
        <h2>Previous Window State:</h2>
        <pre>{JSON.stringify(windowPrevState, null, 2)}</pre>
        <h2>Current Window State:</h2>
        <pre>{JSON.stringify(windowCurrState, null, 2)}</pre>
        <h2>Average:</h2>
        <p>{average}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;
