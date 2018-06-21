var questions = {
    q1: [],
    q2: [],
    q3: [],
    q4: [],
    q5: [],
    q6: [],
    q7: [],
    q8: [],
    q9: [],
    q10: []
}

//  Note: [1] is always the correct answer

questions.q1[0]='What scene opens "The Matrix"?';
questions.q1[1]='Telephone conversation';
questions.q1[2]='A black cat meowing';
questions.q1[3]='Agent Smith putting on his sunglasses';
questions.q1[4]='Neo waking at his computer';

questions.q2[0]='All these legendary lines appear in "The Matrix", right? Wrong! Only one of these lines is actually SPOKEN. Which one is it?';
questions.q2[1]='Free my mind.';
questions.q2[2]='Luke, I am your father';
questions.q2[3]='Remember, there is no spork';``
questions.q2[4]="I'm going to make him an offer he can't refuse";

questions.q3[0]="Which member of the crew designed 'The woman in the red dress'?";
questions.q3[1]='Mouse';
questions.q3[2]='Cypher';
questions.q3[3]='Trinity';
questions.q3[4]='Dozer';

questions.q4[0]='In the film, two characters say the line "Welcome to the real world". Morpheus and who else?';
questions.q4[1]='Cypher';
questions.q4[2]='Tank';
questions.q4[3]='Agent Smith';
questions.q4[4]='Dozer';

questions.q5[0]="Cypher gives Neo a drink around halfway through the film. He describes it as being good for two things: 'degreasing engines' and 'killing brain cells'.";
questions.q5[1]='True - thats how the scene went';
questions.q5[2]="He actually said the drink was 'technically a solution'";
questions.q5[3]='He gave him a steak, not a drink';
questions.q5[4]='Cypher never gave Neo anything';

questions.q6[0]='What colour is the grass inside the matrix?';
questions.q6[1]='green';
questions.q6[2]='grey';
questions.q6[3]='blue';
questions.q6[4]='black';

questions.q7[0]='According to The Oracle, how soon will Neo feel better after hearing her disappointing news?';
questions.q7[1]='When he has finished eating a cookie';
questions.q7[2]='After he has left her apartment';
questions.q7[3]="When he finds 'The One'";
questions.q7[4]='In a few minutes';

questions.q8[0]='What colour was the liquid that was injected into Morpheus by the agents to make him talk?';
questions.q8[1]='Metallic gray';
questions.q8[2]='Glowing orange';
questions.q8[3]='Clear';
questions.q8[4]='Bright blue';

questions.q9[0]="What is 'Neo' an anagram of?";
questions.q9[1]='One';
questions.q9[2]='Two'
questions.q9[3]='Not every one';
questions.q9[4]='Noe';

questions.q10[0]="How many of Morpheus' crew are killed by agents (and stay dead!) in the film?";
questions.q10[1]='1';
questions.q10[2]='3';
questions.q10[3]='7';
questions.q10[4]='11';

// Global variable for the answer selected by user
var selectedA;
//  Global var for which question we are on
var onQnum=1;
// Variable for time left to answer question
var timeleft = 30;
//  Timer to answer question variable
var intervalId;
// Variables to track correct & incorrect
var correctA=0;
var incorrectA=0;





// Function to start timer on questoin
function startTimer() {
    intervalId = setInterval(decrement, 1000);
  }

//  Function that will run down the timer
function decrement() {

    timeleft--;

    $(".timeleft").html("You have " + timeleft + " seconds remaining");

    if (timeleft === 0) {
        stop();
        gotitwrong();
    }
  }

//  Funcion to stop the timer
function stop() {
    clearInterval(intervalId);
    timeleft=30;
  }

//  Randomize array element order in-place.
//  Using Durstenfeld shuffle algorithm.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//  Function to populate Q & A divs with info, passing in which Q&A set to be displayed.
function popQA(qnum) {
    qnum = "q"+qnum;
    //  New array to be displayed with answers in random order
    var dispArry = shuffleArray(questions[qnum].slice(1));
    //  Display the question
    $(".question").html(questions[qnum][0]);
    //  Display the four answers
    for (i=0; i<dispArry.length; i++) {
            $("#a" + (i+1)).html(dispArry[i]);
    }

}

// Function for when all questions have been asked and game is over
function alldone() {
    $('.varDisArea').html("All done the quiz");
    $('.varDisArea').append("<br><br>");
    $('.varDisArea').append("Correct Answers: " + correctA);
    $('.varDisArea').append("<br><br>");
    $('.varDisArea').append("Incorrect Answers: " + incorrectA);
    $('.varDisArea').append("<br><br>");
    $('.varDisArea').append('<button id="resetbutton">RESET</button>');

}


// Function to put up Q&A div format within variable display area
function divQA() {
    var inT ='<div class="timeleft">You have 30 seconds remaining</div>';
    var inQ ='<div class="question"></div>';
    var inA1='<div class="answer" id="a1"></div>';
    var inA2='<div class="answer" id="a2"></div>';
    var inA3='<div class="answer" id="a3"></div>';
    var inA4='<div class="answer" id="a4"></div>';
    $('.varDisArea').html("");
    $('.varDisArea').append(inT, inQ, inA1, inA2, inA3, inA4);
}

//  Function to put up correct answer display
function gotitright() {
    $('.varDisArea').html('<img src="assets/images/correct.gif">');
    onQnum++;
    correctA++;
    stop();
    if(onQnum<11) {
        setTimeout(function() {
            askQ(onQnum);  
        }, 2000);
    }
    else {
        setTimeout(function() {
            alldone();  
        }, 1500);    
    }
}

//  Function to let you know you got it wrong, and display what the correct answer was
function gotitwrong() {
    $('.varDisArea').html('<img src="assets/images/nope.gif">');
    $('.varDisArea').append("<br><br>");
    $('.varDisArea').append("The correct answer was: ");
    $('.varDisArea').append("<br><br>");
    var corans=(questions["q" + onQnum][1]);
    $('.varDisArea').append('<div class="answer">' + corans + '</div>');
    onQnum++;
    incorrectA++;
    stop();
    if(onQnum<11) {
        setTimeout(function() {
            askQ(onQnum);  
        }, 2000);
    }
    else {
        setTimeout(function() {
            alldone();  
        }, 1500);    
    }

}

//  Function to evaluate answer and return true or false
function checkA(onQnum) {
    if (selectedA === questions["q" + onQnum][1])
        return true;
    else {
        return false;
    }
}

//  Function to ask a question.. 
function askQ(onQue) {
    divQA();
    popQA(onQue);
    startTimer();
}

// Function to toss up the start button and reset variables
function startup() {
    $('.varDisArea').html('<button id="startbutton">START</button>');
    onQnum=1;
    correctA=0;
    incorrectA=0;
}


$(document).ready(function() {

    //  Check for click on Start button
    $(document).on("click", "#startbutton", function() {
        askQ(onQnum);
    });

    //  This checks if an answer has been selected and evaluates the answer
    $(document).on("click", ".answer", function(){
        selectedA=$(this).text();

        //evaluate answer
        var answercorrect=checkA(onQnum);
        if (answercorrect){
            gotitright();
        }
        else {
            gotitwrong();
        }

    });

    //  Check for click on reset button
    $(document).on("click", "#resetbutton", function(){
        startup(); 
    });

});





    


