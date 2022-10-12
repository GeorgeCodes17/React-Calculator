import { render } from '@testing-library/react';
import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const buttonsToRender = ['1', '2', '3', '\u00F7', '4', '5', '6', 'x', '7', '8', '9', '+', '0', '=', '-'];
const buttonsValues = ['1', '2', '3', '/', '4', '5', '6', '*', '7', '8', '9', '+', '0', '=', '-'];
const doubleWidthButton = '=';

var allInputs = [];

const Buttons = props => (
  <div>
    {
      [...Array(buttonsToRender.length)].map((e, index) =>
        <button
          className="number-button button"
          key={buttonsValues[index]}
          style={ buttonsValues[index] === doubleWidthButton ? { width:'400px' } : {}}
          onClick={()=>props.handleInput(buttonsToRender[index], buttonsValues[index])}
        >
          {buttonsToRender[index]}
        </button>
      )
    }

  </div>
)

const Display = props => (
  <div className="display-container">
    <p className="display">{props.displayText}</p>
  </div>
)


function Calculator() {
  useEffect(() => {
    document.title = 'Reactful Calculator';
  });
  const [calcDisplay, setCalcDisplay] = useState('0');

  function handleInput(text, value) {
    allInputs.push(value);
    
    if(value === '=') {
      return compute();
    }

    updateDisplay(text, value);
  }
  function compute() {
    for (let i = 0; i < allInputs.length; i++){
      // if operator doesn't have an integer coming before & after than do nothing with it
    };
  }
  
  function updateDisplay(text, value) {
    if(calcDisplay == 0) {
      return setCalcDisplay(text);
    }
    
    setCalcDisplay(calcDisplay + value);
  }

  return (
    <div className="container">
      <Display displayText={calcDisplay}/>
      <div className="most-numbers-container">
        <Buttons numOfButtons={buttonsToRender} handleInput={handleInput} handleCalculation />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
