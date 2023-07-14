const container = document.querySelector('.container'); 
const questionBox = document.querySelector('.question'); 
const choicesBox = document.querySelector('.choices'); 
const nextBtn = document.querySelector('.nextBtn'); 
const scoreCard = document.querySelector('.scoreCard'); 
const alert = document.querySelector('.alert'); 
const startBtn = document.querySelector('.startBtn'); 
const timer = document.querySelector('.timer'); 


const quiz = [
    {
        question:"Q. Which of the following is not  CSS box model property? ",
        choices:["margin","padding","border-radius","border-collapse"],
        answer: "border-collapse"
    },
    {
        
            question:"Q. Can negative values be allowed in padding property? ",
            choices:["yes","no","depends on properties","non of the above"],
            answer: "no"
        
    },
    {
        
        question:"Q. The CSS property used to specify the transparency of an element is ",
        choices:["opacity","visibility","filter","non of the above"],
        answer: "opacity"
    
    },
    {
        
        question:"Q. Which CSS property is used to specify different border styles ",
        choices:["border-style","border","Both A and B","non of the above"],
        answer: "border-style"
    
    }
];
    //making variable
    let currentQuestionIndex = 0;
    let score = 0;
    let quizOver = false;
    let timeLeft = 15;
    let timerId = null;

    //Arrow Function to show Question
    const showQuestions = () =>{
        
        const questionDetails = quiz[currentQuestionIndex];
        questionBox.textContent = questionDetails.question;
        choicesBox.textContent = "";
        for(let i =0; i<questionDetails.choices.length; i++){
            const currentChoice = questionDetails.choices[i];
            const choiceDiv = document.createElement('div');
            choiceDiv.textContent = currentChoice;
            choiceDiv.classList.add('choice');
            choicesBox.appendChild(choiceDiv);

            choiceDiv.addEventListener('click', ()=>{
                if(choiceDiv.classList.contains('selected')){
                    choiceDiv.classList.remove('selected');
                }
                else{
                    choiceDiv.classList.add('selected');
                }
            });
           
        }
        if(currentQuestionIndex < quiz.length){
            startTimer();
        }

       

    }
    //function to check answer
    const checkAnswer = () =>{
        const selectedChoice =  document.querySelector('.choice.selected');
        if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
            
            displayAlert('Correct Answer!');
            score++;
        }
        else{
            const correctAnswer = quiz[currentQuestionIndex].answer;
            displayAlert(`Wrong Answer! ${correctAnswer} is correct Answer`)
        }
        timeLeft = 15;
        currentQuestionIndex++;
        if(currentQuestionIndex < quiz.length){
           
            showQuestions();
        }
        else{
            showScore();
            stopTimer();
            quizOver = true;
            timer.style.display = "none";
        }
    } 
    //function to show score
    const showScore = () =>{
        questionBox.textContent="";
        choicesBox.textContent="";
        scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
        displayAlert("Congratulation! You have completed this quiz")
        nextBtn.textContent = "Play Again";
       
    }
    //function to show alert
    const displayAlert = (msg)  => { 
        alert.style.display = "block";
        alert.textContent=msg;
        setTimeout(()=>{
            alert.style.display = "none";
        },1200);
    }
    //function to start timer
    const startTimer = () =>{
        clearInterval(timerId);
        timer.textContent = timeLeft;
        const countDown = ()=>{
            timeLeft--;
            timer.textContent = timeLeft;
            if(timeLeft === 0){
                const confirmUser = confirm("Time Up! ! ! Do you want to play the quiz again");
                if(confirmUser){
                    timeLeft = 15;
                    startQuiz();
                }
                else{
                    startBtn.style.display = "block";
                    container.style.display = "none";
                    return;
                }
            }
        }
       timerId = setInterval(countDown,1000);
    }
    const stopTimer = () =>{
        clearInterval(timerId);
    }
    const startQuiz = () =>{
        timeLeft = 15;
        timer.style.display = "flex";
        showQuestions();
    }
    startBtn.addEventListener('click', ()=>{
        startBtn.style.display = "none";
        container.style.display = "block";
        startQuiz();
    });

    nextBtn.addEventListener('click', ()=>{
        const selectChoice = document.querySelector('.choice.selected');
        if(!selectChoice && nextBtn.textContent  === "Next"){
            // alert("Please select any option");
            displayAlert("Please select any option");
            return;

        }
        if(quizOver){
            nextBtn.textContent="Next";
            scoreCard.textContent="";
            currentQuestionIndex = 0;
           startQuiz();
            quizOver = false;
            score = 0;
           
        }
        else{
            checkAnswer();
        }
        
    
    });

