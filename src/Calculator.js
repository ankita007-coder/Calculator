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
        // Check if the last character is a digit or closing parenthesis
        const lastChar = prevResult.charAt(prevResult.length - 1);
        if (!isNaN(lastChar) || lastChar === ')') {
          let openParenthesesCount = 0;
          let closeParenthesesCount = 0;
          let i = prevResult.length - 1;
  
          // Traverse backwards to find the corresponding opening parenthesis
          while (i >= 0) {
            const char = prevResult.charAt(i);
            if (char === ')') {
              closeParenthesesCount++;
            } else if (char === '(') {
              openParenthesesCount++;
            }
  
            if (openParenthesesCount === closeParenthesesCount) {
              break;
            }
  
            i--;
          }
  
          // If the opening parenthesis is found, toggle the sign inside it
          if (i >= 0 && prevResult.charAt(i - 1) === '-') {
            return (
              prevResult.slice(0, i - 1) +
              '+' +
              prevResult.slice(i, prevResult.length)
            );
          } else {
            return (
              prevResult.slice(0, i) +
              '(-' +
              prevResult.slice(i, prevResult.length) +
              ')'
            );
          }
        } else {
          // Append a minus sign to the expression
          return prevResult.concat("-");
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
