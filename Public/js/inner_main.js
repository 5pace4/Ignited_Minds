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

    //Quiz Section Functionality
    const _question = document.getElementById('question');
    const _options = document.querySelector(".quiz-options");
    const _correctScore = document.getElementById('correct-score');
    const _totalQuestion = document.getElementById('total-question');
    const _checkBtn = document.getElementById('check-answer');
    const _playAgain = document.getElementById('play-again');
    const _result = document.getElementById('result')

    let correct = "", correctScore = askedCount = 0, totalQuestion = 10;

    function eventListener(){
        _checkBtn.addEventListener('click', checkAnswer);
        _playAgain.addEventListener('click', restartQuiz);
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadquestion();
        eventListener();
        _totalQuestion.textContent = totalQuestion;
        _correctScore.textContent = correctScore
    });

    async function loadquestion(){
        const APIurl = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple';
        const result = await fetch(`${APIurl}`);
        const data = await result.json();

        _result.innerHTML = "";
        showQuestion(data.results[0]);
    }

    function showQuestion(data){
        _checkBtn.disabled = false;
        correct = data.correct_answer;
        let incorrect = data.incorrect_answers;
        let optionList = incorrect;
        optionList.splice(Math.floor(Math.random() * incorrect.length + 1), 0, correct);

        _question.innerHTML = `${data.question} <br> <span class="category">${data.category} </span>`;
        _options.innerHTML = `${optionList.map((option, index) =>`
            <li> ${index + 1}.<span> ${option} </span> </li>
        `).join('')}`;

        selectOption();
    }

    function selectOption(){
        _options.querySelectorAll('li').forEach((option) =>{
            option.addEventListener('click', () => {
                if(option.querySelector('.selected')){
                    const activeOption = _options.querySelector('.selected');
                    activeOption.classList.remove('selected');
                }
                option.classList.add('selected');
            });
        });
    }

    function checkAnswer(){
        _checkBtn.disabled = true;
        if(_options.querySelector(".selected")){
            let selectedAnswer = _options.querySelector('.selected span').textContent;
            if(selectedAnswer.trim() == HTMLDecode(correct)){
                correctScore++;
                _result.innerHTML = `<p> <i class="fas fa-check"> </i> Correct Answer! </p>`;
            }
            else{
                _result.innerHTML = `<p> <i class="fas fa-times"> </i> Wrong Answer! <small> <b> Correct Answer : </b> ${correct} </small> </p>`;
            }
            checkCount();
        }
        else{
            _result.innerHTML = `<p> <i class="fas fa-question"></i> Please Select an Option! </p>`;
            _checkBtn.disabled = false;
        }
    }

    function HTMLDecode(textString){
        let doc = new DOMParser().parseFromString(textString, "text/html");
        return doc.documentElement.textContent;
    }

    function checkCount(){
        askedCount++;
        setCount();
        if(askedCount == totalQuestion){
            _result.innerHTML = `<p> Your Score is ${correctScore}. </p>`;
            _playAgain.style.display = "block";
            _checkBtn.style.display = "none";
        }
        else{
            setTimeout(() =>{
                loadquestion();
            }, 300);
        }
    }

    function setCount(){
        _totalQuestion.textContent = totalQuestion;
        _correctScore.textContent = correctScore;
    }

    function restartQuiz(){
        correctScore = askedCount = 0;
        _playAgain.style.display = "none";
        _checkBtn.style.display = "block";
        _checkBtn.disabled = false;
        setCount();
        loadquestion();
    }


    // QUote Generation Functionality
    document.getElementById("generateBtn").addEventListener("click", function() {
        const quotes = [
            "Be yourself; everyone else is already taken. - Oscar Wilde",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
            "You miss 100% of the shots you don't take. - Wayne Gretzky",
            "Life is what happens when you're busy making other plans. - John Lennon",
            "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
            "The only way to do great work is to love what you do. - Steve Jobs",
            "The journey of a thousand miles begins with one step. - Lao Tzu",
            "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
            "The best way to predict the future is to create it. - Peter Drucker",
            "Happiness is not something readymade. It comes from your own actions. - Dalai Lama",
            "It is during our darkest moments that we must focus to see the light. - Aristotle",
            "Believe you can and you're halfway there. - Theodore Roosevelt",
            "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
            "Life is a succession of lessons which must be lived to be understood. - Helen Keller",
            "It does not matter how slowly you go as long as you do not stop. - Confucius",
            "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
            "The best revenge is massive success. - Frank Sinatra",
            "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
            "If you want to achieve greatness stop asking for permission. - Anonymous",
            "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
            "Dreaming, after all, is a form of planning. - Gloria Steinem",
            "I never dreamt of success. I worked for it. - Estee Lauder",
            "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
            "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
            "The best revenge is massive success. - Frank Sinatra",
            "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
            "If you want to achieve greatness stop asking for permission. - Anonymous",
            "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
            "Dreaming, after all, is a form of planning. - Gloria Steinem",
            "I never dreamt of success. I worked for it. - Estee Lauder",
        ];
        
    
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteResult = document.getElementById("quoteResult");
        quoteResult.innerHTML = `<p> ${randomQuote} </p>`;
    });

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

    function calculateSquareRoot() {
      try {
        const value = parseFloat(displayValue);
        if (value >= 0) {
          displayValue = Math.sqrt(value).toString();
        } else {
          displayValue = "Error";
        }
        updateDisplay();
      } catch (error) {
        displayValue = "Error";
        updateDisplay();
      }
    }

    function calculateCubeRoot() {
      try {
        const value = parseFloat(displayValue);
        displayValue = Math.cbrt(value).toString();
        updateDisplay();
      } catch (error) {
        displayValue = "Error";
        updateDisplay();
      }
    }

    function calculateSquare() {
      try {
        const value = parseFloat(displayValue);
        displayValue = (value * value).toString();
        updateDisplay();
      } catch (error) {
        displayValue = "Error";
        updateDisplay();
      }
    }

    function calculateSine() {
        try {
          const value = parseFloat(displayValue);
          const radians = (value * Math.PI) / 180;
          displayValue = Math.sin(radians).toString();
          updateDisplay();
        } catch (error) {
          displayValue = "Error";
          updateDisplay();
        }
      }
  
      function calculateCosine() {
        try {
          const value = parseFloat(displayValue);
          const radians = (value * Math.PI) / 180;
          displayValue = Math.cos(radians).toString();
          updateDisplay();
        } catch (error) {
          displayValue = "Error";
          updateDisplay();
        }
      }
  
      function calculateTangent() {
        try {
          const value = parseFloat(displayValue);
          const radians = (value * Math.PI) / 180;
          displayValue = Math.tan(radians).toString();
          updateDisplay();
        } catch (error) {
          displayValue = "Error";
          updateDisplay();
        }
      }
    function calculateCube() {
        try {
          const value = parseFloat(displayValue);
          displayValue = (value * value * value).toString();
          updateDisplay();
        } catch (error) {
          displayValue = "Error";
          updateDisplay();
        }
      }

    function evaluateExpression(expression) {
      return Function(`'use strict'; return (${expression})`)();
    }

