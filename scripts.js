function add (a, b){
    return Math.round((a + b) * 10000) / 10000;
}

function substract(a, b){
    return Math.round((a - b) * 10000) / 10000;
}

function multiply (a, b){
    return Math.round((a * b) * 10000) / 10000;
}

function divide (a, b){
    if(a != 0 && b != 0){
        return Math.round((a / b) * 10000) / 10000;
    }else{
        error = true;
        return error;
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

let botVal = "";
let topVal = "";
let symbol = "";
let error = false;
let dotCheck = false;
let equalCheck = false;
let funcDisabled = false;
const maxCharacters = 10;

let isClick = false;

const topText = document.querySelector(".top");
const botText = document.querySelector(".bot");
const dotButton = document.querySelector("button.dot");
const equalButton = document.querySelector("button.equal");
const deb = document.querySelector(".debug");

//window.setInterval(debFunc, 100)

function debFunc(){
    deb.textContent = "Top: " + topVal + typeof topVal + " Bot: " + botVal + typeof botVal + " Symb: " + symbol + typeof symbol;
}

const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        switch(btn.className){
            case "number":
                return displayUpdate(btn.className, btn.textContent);
            case "equal":
                    return displayUpdate(btn.className, btn.textContent);
            case "dot":
                return displayUpdate(btn.className, btn.textContent);
            case "function":
                return displayUpdate(btn.className, btn.textContent);
            case "del":
                return delLast();
            case "clear":
                return displayClear();
        }
    });
});

document.addEventListener("keydown", e => {
    if(e.key >= 0 && e.key <= 9){
        displayUpdate("number", e.key.toString())
    }else if(e.key === "Enter" && !equalCheck){
        displayUpdate("equal", "=");
    }else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"){
        displayUpdate("function", e.key.toString());
    }else if(e.key === "." || e.key === "," && !dotCheck){
        displayUpdate("dot", ".");
    }else if(e.key === "Delete" || e.key === "Backspace"){
        console.log(e.key);
        delLast();
    }else if(e.key === "Escape"){
        displayClear();
    }
})

function displayUpdate(type, value){
    if(topVal === ""){
        if (type === "number" || type === "dot"){
            if(botVal.length <= maxCharacters){
                botVal += value;
                botText.textContent = botVal;
                if(type === "dot" && !dotCheck){
                    dotCheck = true;
                    dotButton.disabled = true;
                }  
            } 
        }
        else if(type === "function" && botVal != ""){
            dotCheck = false;
            dotButton.disabled = false;
            equalButton.disabled = false;
            symbol = value;
            topVal = botVal;
            botText.textContent = botVal;
            topText.textContent = topVal + " " + symbol;
            isClick = true;
        }
    }else{
        if (type === "number" || type === "dot"){
            if(isClick){
                botVal = "";
                isClick = false;
            }
            if(botVal.length <= maxCharacters){
                funcDisabled = false;
                //disableButtons(funcDisabled);
                if(equalCheck){
                    displayClear();
                    equalCheck = false;
                }
                if(botVal.includes(".") || type === "dot"){dotCheck = true; dotButton.disabled = true;}
                equalButton.disabled = false;
                botVal += value;
                botText.textContent = botVal;
            }
        }
        else if(type === "function"){
            if(!funcDisabled){
            funcDisabled = true;
            //disableButtons(funcDisabled);
            equalCheck = false;
            dotCheck = false;
            dotButton.disabled = false;
            equalButton.disabled = false;
            let result = 0;
            if(!symbol.includes("=")){
                result = operate(Number(topVal), symbol, Number(botVal));
                console.log(symbol);
            }else{
                result = topVal;
            }
            if(!error){
                topVal = result;
                symbol = value;
                topText.textContent = result + " " + symbol;
                isClick = true;
            }else{
                errorMassage();
            }
            }else{
                symbol = value;
                topText.textContent = topVal + " " + symbol;
            }
        }else if(type === "equal" && !equalCheck){
            funcDisabled = false;
            //disableButtons(funcDisabled);
            equalCheck = true;
            let result = operate(Number(topVal), symbol, Number(botVal));
            symbol = value;
            if(!error){
                topText.textContent += " " + botVal + " =";
                botVal = result.toString();
                botText.textContent = botVal;
                topVal = result;
                dotCheck = false;
                dotButton.disabled = false;
                equalButton.disabled = true;
                isClick = true;
            }else{
                errorMassage();
            }
        }
    }

}

function delLast(){
    if(botVal.length > 0){
        const arr = botVal.split("");
        if(arr[arr.length - 1] === "."){
            dotCheck = false;
            dotButton.disabled = false;
        }
        arr.length = arr.length - 1;
        botVal = arr.join("");
        botText.textContent = botVal;
    }
    if(symbol === "="){
        topVal = botVal;
    }
}

function disableButtons(value = false){
    buttons.forEach(btn => {if(btn.className === "function"){
        btn.disabled = value;}})
}

function displayClear(){
    botVal = "";
    topVal = "";
    symbol = "";
    topText.textContent = "";
    botText.textContent = "CLEARED";
    equalButton.disabled = true;
    dotButton.disabled = false;
    funcDisabled = false;
    disableButtons(false);
    equalCheck = false;
    isClick = false;
}

function errorMassage(){
    displayClear();
    botText.textContent = "DO NOT DIVIDE BY 0"
    error = false;
}


/*
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
*/