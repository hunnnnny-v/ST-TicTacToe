let boxes = document.querySelectorAll(".box");

//selects all the html elements having class name .box bascially the squares , result is stored in an boxes

let turn = "X";

//initialises turn variable with value X , keeps track of turn of player either x or o.

let isGameOver = false;

//initialises variable called isGameOver with bool false, checks whether the game is draw or won.

//iterates over the boxes array
boxes.forEach((e) => {
  //for each ele e in boxes array the code is executed.
  e.innerHTML = ""; //sets the inner html of current box to empty string ensuring that the box  is empty before the user clicks it.
  e.addEventListener("click", () => {
    //this is an eventlistener which responds when the user clicks the button.when click is detected this code works.

    //this checks  that the  game is not already over and the box clicked is empty if yes
    if (!isGameOver && e.innerHTML === "") {
      //if condition is met then the html element of the box for the element e is set to be current player turn that is either x or o.
      e.innerHTML = turn;
      cheakWin(); //this checks whether the player has won
      cheakDraw(); //this checks for the draw condition that is the boxes are all fulleed but the plyaer hasnt won
      changeTurn(); //this helps in changing the turn of other player once a move is made.
    }
  });
});

//responsible for changing the turn between the players.

function changeTurn() {
  if (turn === "X") {
    //if the current player is x means now its o's turn
    turn = "O"; //changes the turn to player 0
    document.querySelector(".bg").style.left = "85px";
  } else {
    turn = "X"; //else if the current player was o then its x's turn now.
    document.querySelector(".bg").style.left = "0";
  }
}

//checks if the current player has won the game or not.
function cheakWin() {
  //defines an array of all the possible winning conditions of three boxes
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //iterates to the each possible winning condition.
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;

    //checks if the first box is not empty and all the three have the same value
    if (v0 != "" && v0 === v1 && v0 === v2) {
      isGameOver = true; //if the condition is true game is over
      document.querySelector("#results").innerHTML = turn + " win"; //updates the element's contents to display the  winner
      document.querySelector("#play-again").style.display = "inline";
      //shows the play again button

      for (j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
        boxes[winConditions[i][j]].style.color = "#000";
      }
    }
    //this highlights the winning line by setting the background colour and text color of the winning boxes.
  }
}

//checks if the game has ended or not.
function cheakDraw() {
  //ensures that it is only runned when the game is not over
  if (!isGameOver) {
    //assumes that the game might be a draw.
    let isDraw = true;

    //iterates through all the boxes.
    boxes.forEach((e) => {
      //is box is empty it set isDraw to false.
      if (e.innerHTML === "") isDraw = false;
    });

    if (isDraw) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = "Draw";
      document.querySelector("#play-again").style.display = "inline";
    }
  }
}

//whenever user clicks the play again button this code will be executed.
document.querySelector("#play-again").addEventListener("click", () => {
  //sets the isgameover to false to show that the game isnt over.
  isGameOver = false;

  //resets the turn to player x
  turn = "X";

  //sets the lefft style property of the element with class .bg to the 0, this moves the element to the left side of the board.

  document.querySelector(".bg").style.left = "0";
  //removes the current result to empty or any previus result stored.
  document.querySelector("#results").innerHTML = "";

  //hides the play again button since its no longer neeeded
  document.querySelector("#play-again").style.display = "none";

  //iterates to all boxes in the board

  boxes.forEach((e) => {
    //clear  the content inside each box
    e.innerHTML = "";

    //removes any custom background or color from the boxes
    e.style.removeProperty("background-color");

    //resets  the text color to white
    e.style.color = "#fff";
  });
});
