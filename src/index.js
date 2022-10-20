import { render } from '@testing-library/react';
import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const buttonsToRender = ['Clear', '-', 'Back', '1', '2', '3', '\u00F7', '4', '5', '6', 'x', '7', '8', '9', '+', '0', '.', '='];
const buttonsValues = ['c', '-', 'b', '1', '2', '3', '/', '4', '5', '6', '*', '7', '8', '9', '+', '0', '.' , '='];

const doubleWidthButton = ['=', 'b'];

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
  }
  
  function decrementCalcInput() {
    setCalcDisplay(calcDisplay.slice(0, -1));
    calcInputs = calcInputs.slice(0, -1);
  }

  function calculateAnswer() {
    try {
      return eval(calcInputs).toString();
    } catch (e) {
      return 'e';
    }
  }

  function addToCalcDisplay(inputToDisplay, inpValue) {
    setCalcDisplay(calcDisplay + inputToDisplay);
    calcInputs += inpValue;
  }

  function handleInput(inputToDisplay, inpValue) {
    if(calcDisplay === '0') {
      setCalcDisplay(inputToDisplay);
      return calcInputs += inpValue;
    }
    switch(inpValue) {
      case '.':
        var lastNum = calcInputs.split(/[*/+-]+/).pop();
        if(lastNum.split('.').length-1 === 1){
          return;
        }
        return addToCalcDisplay(inputToDisplay, inpValue);
      case 'b':
        return decrementCalcInput();
      case 'c':
        return resetCalculator();
      case '=':
        calcInputs = calculateAnswer();
        if(calcInputs === 'e') {
          resetCalculator();
        }
        return setCalcDisplay(calcInputs);
      default:
        return addToCalcDisplay(inputToDisplay, inpValue);
    }
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
