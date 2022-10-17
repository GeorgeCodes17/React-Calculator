import { render } from '@testing-library/react';
import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const buttonsToRender = ['Clear', '1', '2', '3', '\u00F7', '4', '5', '6', 'x', '7', '8', '9', '+', '0', '=', '-'];
const buttonsValues = ['c', '1', '2', '3', '/', '4', '5', '6', '*', '7', '8', '9', '+', '0', '=', '-'];
const doubleWidthButton = ['=', 'c'];

var calcInputs = '';

const Buttons = props => (
  <div>
    {
      [...Array(buttonsToRender.length)].map((e, index) =>
        <button
          className="number-button button"
          key={buttonsValues[index]}
          style={ doubleWidthButton.includes(buttonsValues[index]) ? { width:'400px' } : {}}
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
    <p id="calculator-display" className="display">{props.displayText}</p>
  </div>
)


function Calculator() {
  useEffect(() => {
    document.title = 'Reactful Calculator';
  });
  const [calcDisplay, setCalcDisplay] = useState('0');

  function resetCalculator() {
    setCalcDisplay('0');
    calcInputs = '';
    return;
  }

  function handleInput(inputToDisplay, inpValue) {
    if(inpValue === 'c') {
      return resetCalculator();
    }

    if(inputToDisplay === '=') {
      return setCalcDisplay(calcInputs = calculateAnswer());
    }

    calcInputs += inpValue;
    if(calcDisplay === '0') {
      return setCalcDisplay(inputToDisplay);
    }
    setCalcDisplay(calcDisplay + inputToDisplay);
  }

  function calculateAnswer() {
    return eval(calcInputs);
  }

  return (
    <div className="container">
      <Display displayText={calcDisplay}/>
      <div className="most-numbers-container">
        <Buttons numOfButtons={buttonsToRender} handleInput={handleInput} />
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
