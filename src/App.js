import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import CandleStickCanvas from './components/CandleStickCanvas.js'
import Canvas from './components/Canvas'

function App() {
  return (
    <div className="App">
      <CandleStickCanvas style={"marginTop: 10rem"}/>
    </div>
  );
}


export default App;
