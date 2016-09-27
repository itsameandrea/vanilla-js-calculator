(function() {

    //--Assign all the buttons, operator and whether a number is decimal or not to variables
    var buttons = document.querySelectorAll('#calculator span');
    var mathOperators = ['+', '-', 'x', '÷', '^'];
    var isDecimal = false;
    var valueButton;
    var calcScreen;
    var calcScreen;
    
    
    //--Loop through all the buttons in order to add event listeners
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e){
            //--Assign the calcScreen div, the calcScreen text and the value of the clicked button to variables
            calcScreen = document.getElementById('screen');
            textCalcScreen = calcScreen.innerHTML;
            valueButton = this.innerHTML;

           calculate(valueButton, calcScreen, textCalcScreen);
           
        });
    }    
    
    window.addEventListener("keydown", ifButtonPressed);
    
    function ifButtonPressed(e){
        calcScreen = document.getElementById('screen');
        textCalcScreen = calcScreen.innerHTML;
    
        
        switch (event.which){
            
            case 48:
                valueButton = 0;
                break;
            case 49:
                valueButton = 1;
                break;
            case 50:
                valueButton = 2;
                break;
            case 51:
                valueButton = 3;
                break;
            case 52:
                valueButton = 4;
                break;
            case 53:
                valueButton = 5;
                break;
            case 54:
                valueButton = 6;
                break;
            case 55:
                valueButton = 7;
                break;
            case 56:
                valueButton = 8;
                break;
            case 57:
                valueButton = 9;
                break;
            case 187:
                valueButton = "=";
                break;
            case 107:
                valueButton = "+";
                break
            case 111:
                valueButton = "÷";
                break;
            case 106:
                valueButton = "x";
                break;
            case 109:
                valueButton = "-";
                break;
            default:
                valueButton = "";
            
        }
        
        calculate(valueButton, calcScreen, textCalcScreen);
        
    }
     
    function calculate(button, display, text){        
            
            if (button == "C"){ //-- Reset the value of the calcScreen when C is pressed
                display.innerHTML = "";
                
            } else if(button == '=') { //-- Eval the equation that will be created by taking the value of the variable calcScreen
            
    			var equation = text;
    			var lastChar = equation[equation.length - 1];
    			
    			//-- Replace all the x and ÷ with the actual operators
    			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
    			
    			//-- Calculate directly the exponentiation if the operator ^ is in the string
    			if (equation.indexOf("^") > -1){
    			    
    			    var firstValue = equation.split('^')[0];
    			    var secondValue = equation.split('^')[1]
    			    equation = Math.pow(firstValue, secondValue);
    			    
    			}
    			
    			//-- Remove the last char of the equation if it is the . or an operator
    			if(mathOperators.indexOf(lastChar) > -1 || lastChar == '.')
    				equation = equation.replace(/.$/, '');
    			
    			if(equation)
    				display.innerHTML = eval(equation);
    				
    			isDecimal = false;
    		}
        		
        		// Basic functionality of the calculator is complete. But there are some problems like 
    		// 1. No two mathOperators should be added consecutively.
    		// 2. The equation shouldn't start from an operator except minus
    		// 3. not more than 1 decimal should be there in a number
    		
    		// We'll fix these issues using some simple checks
    		
    		// indexOf works only in IE9+
    		else if(mathOperators.indexOf(button) > -1) { //-- Controls made when the operator buttons are clicked
    			
    			
    			var lastChar = text[text.length - 1];
    			
    			//-- Makes sure that an operator is not clicked twice in a row
    			if(text != '' && mathOperators.indexOf(lastChar) == -1) 
    				display.innerHTML += button;
    			
    			//-- Allows just the minus to be used as first char of the equation
    			else if(text == '' && button == '-') 
    				display.innerHTML += button;
    			
    			//-- Replace the last operator (if it's the last char) with the operator that just got clicked
    			if(mathOperators.indexOf(lastChar) > -1 && text.length > 1) {
                    //-- Using regex to make sure that any (.) operator at the end of the string ($) will be replaced
    				display.innerHTML = text.replace(/.$/, button);
    			}
    			
    			isDecimal =false;
    		}
    		
            //-- Allows just one decimal to be added thanks to a flag variable isDecimal
    		else if(button == '.') {
    			if(!isDecimal) {
    				display.innerHTML += button;
    				isDecimal = true;
    			}
    		}
    		
    		// if any other key is pressed, just append it
    		else {
    		    
    			display.innerHTML += button;
    		    
    		}

        }


})();