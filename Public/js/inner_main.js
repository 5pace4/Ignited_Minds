function function1(){
let filter_btns = document.querySelectorAll('.filter-btn');
    let tab_items = document.querySelectorAll('.tab-item');

    for(let i=0; i<filter_btns.length; i++){
        filter_btns[i].addEventListener('click', function(){
            for(let j=0; j<filter_btns.length; j++){
                filter_btns[j].classList.remove('active');
            }
            filter_btns[i].classList.add('active');

            let selected_tab = filter_btns[i].getAttribute('data-tab');
            for(let p = 0; p<tab_items.length; p++){
                document.querySelector('.tab-filter-item-container').style.height = tab_items[p].scrollHeight + 'px';
                if(tab_items[p].classList.contains(selected_tab)){
                    tab_items[p].classList.add('selected_tab');
                }
                else{
                    tab_items[p].classList.remove('selected_tab');
                }
            }
        });
    }

    for(let t = 0; t < tab_items.length; t++){
        document.querySelector('.tab-filter-item-container').style.height = tab_items[t].scrollHeight + 'px';
    }
}
function1();

// Calculator Functionality

// Science Section Selection
    function selectFact() {
        var selectElement = document.getElementById("factSelect");
        var selectedFactId = selectElement.value;
        var selectedFactElement = document.getElementById(selectedFactId);
        selectedFactElement.scrollIntoView({ behavior: 'smooth' });
    }

//calculator section
let displayValue = "0";

    function updateDisplay() {
      document.getElementById("result").textContent = displayValue;
    }

    function appendToDisplay(val) {
      if (displayValue === "0" && val !== ".") {
        displayValue = val;
      } else {
        displayValue += val;
      }
      updateDisplay();
    }

    function clearDisplay() {
      displayValue = "0";
      updateDisplay();
    }

    function clearLastEntry() {
      if (displayValue !== "0") {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === "") {
          displayValue = "0";
        }
        updateDisplay();
      }
    }

    function calculateResult() {
      try {
        // Using our custom expression parser and evaluator
        const result = evaluateExpression(displayValue);
        displayValue = result.toString();
        updateDisplay();
      } catch (error) {
        displayValue = "Error";
        updateDisplay();
      }
    }

    function evaluateExpression(expression) {
      return Function(`'use strict'; return (${expression})`)();
    }
