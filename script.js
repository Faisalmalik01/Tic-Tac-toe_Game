let playerNameSection = document.querySelector("#playerNameSection");
let gameContainer = document.querySelector("#gameContainer");
let startBtn = document.querySelector("#start");

let player1Name = "";
let player2Name = "";
let currentPlayer = "";
let check = 0;
let winner = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

startBtn.addEventListener("click", function () {
  player1Name = document.querySelector("#player1").value.trim();
  player2Name = document.querySelector("#player2").value.trim();

  if (player1Name === "" || player2Name === "") {
    alert("Please enter both player names.");
    return;
  }

  playerNameSection.style.display = "none";
  gameContainer.style.display = "block";

  currentPlayer = player1Name; // Player 1 starts the game
  document.querySelector(".message").textContent = `${currentPlayer} - Your Turn`;
});

// Existing code for the tic-tac-toe game logic
let buttons = document.querySelectorAll(".btn");
let message = document.querySelector(".message");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (check == 0 && btn.innerHTML === "") {
      btn.innerHTML = "X";
      check = 1;
      currentPlayer = player2Name; // Switch to Player 2's turn
      message.textContent = `${currentPlayer} - Your Turn`;
    } else if (check == 1 && btn.innerHTML === "") {
      btn.innerHTML = "O";
      check = 0;
      currentPlayer = player1Name; // Switch to Player 1's turn
      message.textContent = `${currentPlayer} - Your Turn`;
    }

    btn.disabled = true;
    checkWinner();
  });
});

let disableBtns = () => {
  for (let btn of buttons) {
    btn.disabled = true;
  }
};

let checkWinner = () => {
  let draw = true;

  for (let pattern of winner) {
    let pos1Val = buttons[pattern[0]].innerHTML;
    let pos2Val = buttons[pattern[1]].innerHTML;
    let pos3Val = buttons[pattern[2]].innerHTML;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (pos1Val === "X") {
          message.innerHTML = `${player1Name} - You Won`;
        } else if (pos1Val === "O") {
          message.innerHTML = `${player2Name} - You Won`;
        }
        disableBtns();
        return; // Exit early since a player has won
      }
    } else {
      draw = false;
    }
  }

  if (draw) {
    message.innerHTML = "It's a draw!";
    disableBtns();
    return; // Exit if it's a draw
  }
};

function resetGame() {
  for (let btn of buttons) {
    btn.innerHTML = "";
    btn.disabled = false;
  }
  message.innerHTML = "";
  check = 0;
  currentPlayer = player1Name; // Reset to Player 1 for next game
  message.textContent = `${currentPlayer} - Your Turn`;
}

let newGame = document.querySelector("#new");
newGame.addEventListener("click", resetGame);
