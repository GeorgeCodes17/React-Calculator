import { render } from '@testing-library/react';
import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const buttonsToRender = ['1', '2', '3', '\u00F7', '4', '5', '6', 'x', '7', '8', '9', '+', '0', '=', '-'];
const operatorValues = ['/', '*', '+', '-'];
const buttonsValues = ['1', '2', '3', operatorValues[0], '4', '5', '6', operatorValues[1], '7', '8', '9', operatorValues[2], '0', '=', operatorValues[3]];
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
    if(value === '=') {
      return setCalcDisplay(compute(value));
    }
    allInputs.push(value);
    updateDisplay(text, value);
  }
  function compute() {
    console.log('Computer ', allInputs)
    var numsToCalc = {
      beforeOperator: null,
      operator: '',
      afterOperator: null
    };

    let input;
    var result = 0;
    for (let i = 0; i < allInputs.length-1; i++) {
      input = allInputs[i];

      if(!operatorValues.includes(input)) {
        numsToCalc.beforeOperator = (numsToCalc.beforeOperator === null) ? input : numsToCalc.beforeOperator + input;
      }

      if(operatorValues.includes(input)) {
        numsToCalc.operator = input;
        for (let iter = i+1; iter < allInputs.length; iter++) {
          numsToCalc.afterOperator = (numsToCalc.afterOperator === null) ? allInputs[iter] : numsToCalc.afterOperator + allInputs[iter];
        }
        result = eval(numsToCalc.beforeOperator + numsToCalc.operator + numsToCalc.afterOperator);
        console.log(result);
        return result;
      }
    }
  }
  
  function updateDisplay(text, value) {
    if(calcDisplay === '0') {
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
