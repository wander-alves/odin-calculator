let display = document.getElementById('display')
let evaluationDisplay = document.getElementById('evaluationDisplay');

const buttons = document.querySelectorAll(".buttons>button")
const operators = {
  "+": (a, b)=> a + b,
  "-": (a, b)=> a - b,
  "/": (a, b)=> a / b,
  "*": (a, b)=> a * b,
}

function clearDisplay(element){
  element.innerText = "";
  return;
}

let a, b, operator;

buttons.forEach((button)=> { 
  button.addEventListener("click", ({target})=> {
    const key = target.innerText;
    if(key === "C"){
      if(evaluationDisplay.innerText || display.innerText){
        display.innerText = ""
        evaluationDisplay.innerText = ""
      }
    }
    if(key === "AC"){
      display.innerText = display.innerText.substring(0, (display.innerText.length - 1))
    }
    if(!isNaN(key)){
      displayUpdate(key);
    }
    if(!display.innerText.includes(".") && key === "." && display.innerText.length > 0){
      displayUpdate(key);
    }
    const displayLenght = display.innerText.length;
    
    if(operators[key] && !isNaN(display.innerText[displayLenght - 1])){
      a = Number(display.innerText);
      operator = operator ?? operators[key];
      evaluationDisplay.innerText = display.innerText + key;
      display.innerText = "";
      return;
    }
    if(key === "="){
      if(operator){
        b = Number(display.innerText);
        evaluationDisplay.innerText += display.innerText;
        display.innerText = execute(a, b, operator);
      }   
    }
  })
})

function displayUpdate(value){
  if(!operators[value] || value !== "C" || value !== "AC"){
    display.innerText += value;
  }
}

function execute(a, b, operation){
  if(isNaN(a) && isNaN(b)){
    return;
  }
  const result = operation(a, b);
  operator = undefined;
  return result;
}