(function() {

    //--Assign all the buttons, operator and whether a number is decimal or not to variables
    var buttons = document.querySelectorAll('#calculator span');
    var mathOperators = ['+', '-', 'x', '÷', '^'];
    var isDecimal = false;


    
    //--Loop through all the buttons in order to add event listeners
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e){
            //--Assign the screen div, the screen text and the value of the clicked button to variables
            var screen = document.getElementById('screen');
            var textScreen = screen.innerHTML;
            var valueButton = this.innerHTML;
     
            if (valueButton == "C"){ //-- Reset the value of the screen when C is pressed
                
                screen.innerHTML = "";
                
            } else if(valueButton == '=') { //-- Eval the equation that will be created by taking the value of the variable textScreen
            
    			var equation = textScreen;
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
    				screen.innerHTML = eval(equation);
    				
    			isDecimal = false;
    		}
        		
        		// Basic functionality of the calculator is complete. But there are some problems like 
    		// 1. No two mathOperators should be added consecutively.
    		// 2. The equation shouldn't start from an operator except minus
    		// 3. not more than 1 decimal should be there in a number
    		
    		// We'll fix these issues using some simple checks
    		
    		// indexOf works only in IE9+
    		else if(mathOperators.indexOf(valueButton) > -1) { //-- Controls made when the operator buttons are clicked
    			
    			var lastChar = textScreen[textScreen.length - 1];
    			
    			//-- Makes sure that an operator is not clicked twice in a row
    			if(textScreen != '' && mathOperators.indexOf(lastChar) == -1) 
    				screen.innerHTML += valueButton;
    			
    			//-- Allows just the minus to be used as first char of the equation
    			else if(textScreen == '' && valueButton == '-') 
    				screen.innerHTML += valueButton;
    			
    			//-- Replace the last operator (if it's the last char) with the operator that just got clicked
    			if(mathOperators.indexOf(lastChar) > -1 && textScreen.length > 1) {
                    //-- Using regex to make sure that any (.) operator at the end of the string ($) will be replaced
    				screen.innerHTML = textScreen.replace(/.$/, valueButton);
    			}
    			
    			isDecimal =false;
    		}
    		
            //-- Allows just one decimal to be added thanks to a flag variable isDecimal
    		else if(valueButton == '.') {
    			if(!isDecimal) {
    				screen.innerHTML += valueButton;
    				isDecimal = true;
    			}
    		}
    		
    		// if any other key is pressed, just append it
    		else {
    			screen.innerHTML += valueButton;
    		}

        });
    }


})();