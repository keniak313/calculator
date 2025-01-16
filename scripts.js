function add (a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply (a, b){
    return a * b;
}

function divide (a, b){
    if(a != 0 && b != 0){
        return a / b;
    }else{
        return "DO NOT divide by 0"
    }
}

function operate(a, symbol, b){
    switch(symbol){
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let displayText = "";
const display = document.querySelector("#display");


const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        switch(btn.className){
            case "number":
                return updateDisplay(btn.textContent, false);
            case "dot":
                return updateDisplay(btn.textContent, false);
            case "function":
                return updateDisplay(btn.textContent, true);
            case "clear":
                displayText = "";
                return display.textContent = displayText;
        }
    });
});

function updateDisplay(input, isFunc = false){
    let arr = displayText.split(" ");
    if(!isFunc){
        displayText += input;
    }else if (input != "=" && arr.length < 2){
        displayText += (" " + input + " ");
    }else{ //EQUALS symbol
        displayText = operate(Number(arr[0]),arr[1],Number(arr[2])).toString();
        if(input != "="){
            displayText += (" " + input + " ");
        }
    }
    display.textContent = displayText;
};