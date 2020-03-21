import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

import { fieldUrl, moveUrl, resetFieldUrl } from './constants';

function App() {
  const [winner, setWinner] = useState(null);
  const [field, setField] = useState([[0, 0, 0],[0, 0, 0],[0,0,0]]);

  const updateField = function() {
    axios.get(fieldUrl).then(res => {
      setField(res.data);
    })
  }

  const move = function(x, y){
    if (!winner) {
      axios.post(moveUrl, {
        x: x + 1,
        y: y + 1
      }).then((res) => {
        updateField();
        res.data.status === 'won' && setWinner(res.data.player);
      });
    }
  }

  const reset = function(){
    setWinner(0);
    axios.get(resetFieldUrl).then(res => {
      setField(res.data);
    })
  }

  useEffect(() => {
    updateField();
    setInterval(updateField, 2000);
  }, []);

  const showCell = function(value) {
    if (!value) return ' ';
    return value == '1' ? 'x' : 'o';
  }

  return (
    <div className="App">
      <div className="field">
        {field.map((row, x) => <div key={x} className="row">
          {row.map((el, y) => <div key={y} className="cell" onClick={() => move(x, y)}>{showCell(el)}</div>)}
        </div>)}
      </div>
      {winner && (
        <div className="text-center">
          <p>
            {`Победил ${winner} игрок!`}
          </p>
          <button onClick={() => reset()}>Играть снова</button>
        </div>
      )}
    </div>
  );
}

export default App;
