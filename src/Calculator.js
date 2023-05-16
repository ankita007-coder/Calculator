import React, { useState } from "react";
import './App.css';


const Calculator = () => {
    const [result, setResult] = useState("");
  //handling clicking of button
  const handleClick = (e) => {
    const operator = e.target.name;
    setResult((prevResult) => {
      const lastChar = prevResult.charAt(prevResult.length - 1);
      
      // Check if the last character and current operator are both operators
      if (isOperator(lastChar) && isOperator(operator)) {
        return prevResult; // Do not update the result if two operators are clicked consecutively
      } else {
        return prevResult.concat(operator); // Concatenate the operator to the result
      }
    });
  };
  
  const isOperator = (char) => {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(char);
  };
  
  

  
  //handling clicking of +/- button
  const handleComp = () => {
    setResult(prevResult => {
      if (prevResult !== "") {
        const regex = /(-?\d+\.?\d*)$/;
        const matches = prevResult.match(regex);
  
        if (matches && matches.length > 0) {
          const lastNumber = matches[0];
          let toggledNumber = 0;
          if(lastNumber>0){
            toggledNumber = parseFloat(lastNumber) * -1;
          }
          else{
            toggledNumber = '+'.concat(parseFloat(lastNumber) * -1)
          }
          const updatedResult = prevResult.slice(0, -lastNumber.length) + toggledNumber;
          return updatedResult;
        } else {
          return prevResult;
        }
      }
  
      return prevResult;
    });
  };
  
  
  
//handling the backspace button
  const handleBack =()=>{
    setResult(result.slice(0,-1));
  };
  
  //performing arithmetic operation
  const handleCalculate=()=>{
    setResult(eval(result).toString());
  }

  //to clear the result or input box
  const handleClear=()=>{
    setResult("");
  }
  return (
    <div className="App">
      <form>
        <input type="text" value={result}/>
      </form>
      <div className='keypad'>
        <button className='highlight' onClick={handleBack}>C</button>
        <button onClick={handleComp}>+/-</button>
        <button name="%" onClick={handleClick}>%</button>
        <button name="/" onClick={handleClick}>&divide;</button>
        <button name="7" onClick={handleClick}>7</button>
        <button name="8" onClick={handleClick}>8</button>
        <button name="9" onClick={handleClick}>9</button>
        <button name="*" onClick={handleClick}>&times;</button>
        <button name="4" onClick={handleClick}>4</button>
        <button name="5" onClick={handleClick}>5</button>
        <button name="6" onClick={handleClick}>6</button>
        <button name="-" onClick={handleClick}>&ndash;</button>
        <button name="1" onClick={handleClick}>1</button>
        <button name="2" onClick={handleClick}>2</button>
        <button name="3" onClick={handleClick}>3</button>
        <button name="+" onClick={handleClick}>+</button>
        <button name="0" onClick={handleClick} id='zerocnt'>0</button>
        <button name="." onClick={handleClick}>.</button>
        <button className='highlight' onClick={handleCalculate}>=</button>
        <button className="clear" onClick={handleClear} id="clear">Clear</button>
      </div>
</div>
       );
};

export default Calculator;
