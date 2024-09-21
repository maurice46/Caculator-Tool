document.addEventListener('DOMContentLoaded', () => {

  const screen = document.querySelector('.screen');
  const buttons = document.querySelectorAll('.calc-button'); 
  
  let currentInput = ''; 
  let operator = ''; 
  let previousInput = ''; 

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const buttonText = button.textContent.trim();

            if (button.classList.contains('calc-button')) {
              if (buttonText === 'C') {
                  currentInput = '';
                  previousInput = '';
                  operator = '';
                  screen.textContent = '0';
              } 
              else if (buttonText === '←') {
                  currentInput = currentInput.slice(0, -1);
                  screen.textContent = currentInput || '0';
              } 
              else if (buttonText === '=') {
                  if (currentInput && previousInput && operator) {
                      const result = calculate(previousInput, currentInput, operator);
                      screen.textContent = result;
                      currentInput = result;
                      previousInput = '';
                      operator = '';
                  }
              } 
              else if (['+', '-', '×', '÷'].includes(buttonText)) {
                  if (currentInput) {
                      previousInput = currentInput;
                      operator = buttonText;
                      currentInput = '';
                  }
              } 
              else {
                  currentInput += buttonText;
                  screen.textContent = currentInput;
              }
          }
      });
  });

  function calculate(a, b, operator) {
      const num1 = parseFloat(a);
      const num2 = parseFloat(b);

      switch (operator) {
          case '+':
              return (num1 + num2).toString();
          case "-":
              return (num1 - num2).toString();
          case '×':
              return (num1 * num2).toString();
          case '÷':
              return num2 !== 0 ? (num1 / num2).toString() : 'Error'; 
          default:
              return '';
      }
  }
});