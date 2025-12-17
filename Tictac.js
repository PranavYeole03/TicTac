const boxes = document.querySelectorAll(".box");
const restart = document.getElementById("restart");
const msg = document.getElementById("msg");

let turnX = true;
let gameOver = false;

const winnerPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle box click
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    box.innerText = turnX ? "X" : "O";
    box.style.backgroundColor = turnX ? "#7fffd4" : "#a3f305ff";
    turnX = !turnX;

    checkWinner();
  });
});

// Check winner or draw
function checkWinner() {
  for (let pattern of winnerPattern) {
    const [a, b, c] = pattern;

    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return;
    }
  }

  // Draw check
  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw) {
    msg.innerHTML = `<span class="blink">🤝 Match Draw</span>`;
    gameOver = true;
  }
}

// Display winner
function showWinner(winner) {
  msg.innerHTML = `<span class="blink">🎉 Congratulations! ${winner} Wins</span>`;
  gameOver = true;

  boxes.forEach((box) => {
    box.disabled = true;
    if (box.innerText === "") {
      box.style.backgroundColor = "#ca6d15ff";
    }
  });
}

// Restart game
restart.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#cdd021"; // match CSS
  });

  msg.classList.remove("blink");
  msg.innerText = "Let's Play the Game";

  turnX = true;
  gameOver = false;
});
