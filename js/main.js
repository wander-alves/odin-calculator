let display = document.getElementById('display')
let evaluationDisplay = document.getElementById('evaluationDisplay');

const buttons = document.querySelectorAll(".buttons>button")
const operators = {
  "+": (a, b)=> a + b,
  "-": (a, b)=> a - b,
  "/": (a, b)=> a / b,
  "*": (a, b)=> a * b,
}


function displayUpdate(value){
  if(!operators[value] || value !== "C" || value !== "AC"){
    display.innerText += value;
  }
}

function execute(a, b, operation){
  console.log(b)
  if(isNaN(a) && isNaN(b)){
    return;
  }
  const result = operation(a, b);
  operator = undefined;
  return result;
}

function clearDisplay(){
  display.innerText = "";
  evaluationDisplay.innerText = "";
}

function deleteFromDisplay(currentDisplayLength){
  display.innerText = display.innerText.substring(0, (currentDisplayLength - 1))
}

let a, b, operator;

buttons.forEach((button)=> { 
  button.addEventListener("click", ({target})=> {
    const key = target.innerText;
    const displayLength = display.innerText.length;

    if(key === "C"){
      if(evaluationDisplay.innerText || display.innerText){
        clearDisplay();
      }
    }

    if(key === "AC"){
      deleteFromDisplay(displayLength);
    }

    const isCurrentKeyANumber = !isNaN(key);
    if(isCurrentKeyANumber){
      displayUpdate(key);
    }

    const hasDisplayADotChar = !display.innerText.includes(".");
    if(hasDisplayADotChar && key === "." && displayLength > 0){
      displayUpdate(key);
    }

    const isLastCharANumber = isNaN(display.innerText[displayLength - 1]);
    if(operators[key] && !isLastCharANumber){
      a = Number(display.innerText);
      operator = operator ?? operators[key];
      evaluationDisplay.innerText = display.innerText + key;
      display.innerText = "";
      return;
    }

    if(key === "="){
      if(operator){
        b = Number(display.innerText);
        evaluationDisplay.innerText += b;
        display.innerText = execute(a, b, operator);
      }   
    }
  })
})
