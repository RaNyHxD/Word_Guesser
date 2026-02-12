/**
 * 
 * Word Guesser - The Word Guesser main script for code.org.
 * 
 * @project https://studio.code.org/projects/applab/3629dcf0-e1de-4539-8ec5-e5b152c5eab0
 * @author Joshua Marchuk <Marchuk1josh@gmail.com>
 * @version 1.1.1
 * @license MIT
 * 
 */

//variables
var words = [];
var answer;
var row = 1;
var correct = 0;
var win = 0;
var tempwords = getColumn("Words", "Word");

//Traversel

for(var i=0;i<tempwords.length;i++) {
  if(tempwords[i].length==6) {
    appendItem(words, tempwords[i]);
    console.log(tempwords[i]);
  }
}

//functions

function start() {
  row = 1;
  answer = words[randomNumber(0,words.length-1)];
  console.log(answer);
  setScreen("screen2");
  for(var i=0;i<6;i++) {
    for(var l=0;l<6;l++) {
      setText("r"+row+"l"+(l+1),"");
      setProperty("r"+row+"l"+(l+1),"background-color",rgb(241, 226, 212));
    }
    row++;
  }
}

function guess() {
  var input = getText("guessInput");
  correct = 0;
  setText("guessInput", "");
  for (var i = 0;i<6;i++) {
    if(answer.substring(i,i+1)==input.substring(i,i+1)) {
      correct++;
      setText("r"+row+"l"+(i+1), input.substring(i,i+1));
      setProperty("r"+row+"l"+(i+1), "background-color", rgb(100,255,100));
    } else {
      setText("r"+row+"l"+(i+1), input.substring(i,i+1));
      setProperty("r"+row+"l"+(i+1), "background-color", rgb(241, 226, 212));
    }
    row++;
  }
  if(row==6) {
    win = -1;
    row = 0;
  } else if(correct==6) {
    win = 1;
    row = 0;
  }
  
}

//onEvents

onEvent("startButton", "click", function( ) {
  start();
  row = 0;
});

onEvent("continue", "click", function( ) {
  if(win==1) {
    setScreen("screen3");
    setText("wOutput", "You Won!");
  } else if(win==-1) {
    setScreen("screen3");
    setText("wOutput", "You Lost!");
  }
});

onEvent("guessButton", "click", function( ) {
  guess();
  if(row>7||win!==0) {
    setProperty("guessInput","hidden",true);
    setProperty("guessButton","hidden",true);
    setProperty("continue","hidden",false);
  }
});

onEvent("againButton", "click", function( ) {
  start();
});
