const gameResult = document.querySelector(".result");
const gameMove = document.querySelector(".move");
const gameScore = document.querySelector(".score");

// let score = {
//   wins: 0,
//   losses: 0,
//   ties: 0
// };

function resetGame() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");

  gameResult.innerHTML = "";
  gameMove.innerHTML = "";

  scoreResult();
}

score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win!";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win!";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  result === "You win!"
    ? score.wins++
    : result === "You lose."
    ? score.losses++
    : score.ties++;

  localStorage.setItem("score", JSON.stringify(score));

  gameResult.innerHTML = result;

  // gameMove.innerHTML = `You ${playerMove} - ${computerMove} Computer`;
  gameMove.innerHTML = `You
      <img src="./${playerMove}-emoji.png" alt="">
      <img src="./${computerMove}-emoji.png" alt="">
      Computer`;

  scoreResult();
}

function scoreResult() {
  gameScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  let randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
