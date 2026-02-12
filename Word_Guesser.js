/**
 * 
 * Word Guesser - The Word Guesser main script for code.org.
 *
 * @author Joshua Marchuk <Marchuk1josh@gmail.com>
 * @version 1.2.8
 * @license MIT
 * 
 */
//variables
var tempwords = getColumn("Words", "Word");
var words = [];
var answer;
var row = 1;
var correct = 0;
var win = 0;

//Traversel

for(var i=0;i<tempwords.length;i++) {
  if(tempwords[i].length==6) {
    appendItem(words, tempwords[i]);
    // I had to do this in this way cuz i have to Traverse a dataset.
  }
}

//functions

function start() {
  
  setProperty("guessInput","hidden",false);
  setProperty("guessButton","hidden",false);
  setProperty("continue","hidden",true);
  
  row = 1;
  for(var i=0;i<6;i++) {
    for(var l=0;l<6;l++) {
      setText("r"+(i+1)+"l"+(l+1),"");
      setProperty("r"+(i+1)+"l"+(l+1),"background-color",rgb(241, 226, 212));
    }
  }
  win = 0;
  correct = 0;
  answer = words[randomNumber(0,words.length-1)];
  setScreen("screen2");
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
    
  }
  if(row==6) {
    if(correct<6) {
      win = -1;
    } else if(correct>=6) {
      win = 1;
    }
  } else if(correct>=6) {
    win = 1;
  } else {
    row++;
  }
}

//onEvents

onEvent("startButton", "click", function( ) {
  start();
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
  if(getText("guessInput").length==6) {
    guess();
    if(row>7||win!==0) {
      setProperty("guessInput","hidden",true);
      setProperty("guessButton","hidden",true);
      setProperty("continue","hidden",false);
    }
  }
});

onEvent("againButton", "click", function( ) {
  start();
});
