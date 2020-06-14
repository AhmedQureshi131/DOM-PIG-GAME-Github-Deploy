/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Dom Manipulation
//document object can give us access to the DOM
//querySelector select the words exactly like css 
//the only difference is it select the first element that it finds
//select the element
//if we want to change the text in this element then use textContent.
//There are two different ways to do that.
 //document.querySelector('#current-' + activePlayer).textContent = dice;
// 2 way: document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//just to read the value and stor it into x
//var x = document.querySelector('#score-0').textContent;
//console.log(x);
//we can also use querySelector to change the css as well.
//function btn(){
    
//}
//call the function
//btn();
//events for button
//addEvent has two arguments one is type of the event and other is function to be called when we click on the button
//anonymous function is one that doesn't have a name and it can't be reused.
//insted of adding btn in second argument we can also create the anonymous function
//document.querySelector('btn-roll').addEventListener('click',btn);
//anonymous function
//global scope variables
var scores , roundScore, activePlayer, gamePlaying;
init();
document.querySelector('.btn-roll').addEventListener('click',
function() {
    if(gamePlaying){
       //1. Random number
    var dice = Math.floor(Math.random() * 6)+1;
    
    //2: Display the result
    
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    
    //3: Update the round score IF the rolled number was NOT a 1
    //if it is 1 we lose the the turn will go to the other player
    if (dice !== 1){
        //Add score 
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        //next player
        nextPlayer();
    }     
} 
   
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
         //Add Current score to Global score
    scores[activePlayer] += roundScore;
    
    
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check if player won the game
    if(scores[activePlayer] >=20){
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }else{
    //next Player
    nextPlayer();
    }
}
   
});
//because of DRY we should create a function if we are repeating the same code two times
function nextPlayer(){
     //Next Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        //reload the page
          //document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        //reload the page
          document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
//DRY 
function init(){
    scores = [0,0];
roundScore = 0;
//who is currently playing?
//0 for first and 1 for second
activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

//other function for id's
//getElementById is faster than querySelector
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
    
}



