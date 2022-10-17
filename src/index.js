import { render } from '@testing-library/react';
import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const buttonsToRender = ['1', '2', '3', '\u00F7', '4', '5', '6', 'x', '7', '8', '9', '+', '0', '=', '-'];
const operatorValues = ['/', '*', '+', '-'];
const buttonsValues = ['1', '2', '3', operatorValues[0], '4', '5', '6', operatorValues[1], '7', '8', '9', operatorValues[2], '0', '=', operatorValues[3]];
const doubleWidthButton = '=';

var calcInputs = '';

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
    <p id="calculator-display" className="display">{props.displayText}</p>
  </div>
)


function Calculator() {
  useEffect(() => {
    document.title = 'Reactful Calculator';
  });
  const [calcDisplay, setCalcDisplay] = useState('0');

  function handleInput(inpDisplay, inpValue) {
    if(inpDisplay === '=') {
      return setCalcDisplay(calcInputs = calculateAnswer());
    }
    calcInputs += inpValue;

    if(calcDisplay === '0') {
      return setCalcDisplay(inpDisplay);
    }
    setCalcDisplay(calcDisplay + inpDisplay);
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
