let boxes = document.querySelectorAll(".box");
const restart = document.getElementById('restart');
let turn = true;

const winnerPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turn) {
            box.innerText = "X";
            box.style.backgroundColor = "#7fffd4";
            turn = false;
        } else {
            box.innerText = "O";
            box.style.backgroundColor = "#a3f305ff";
            turn = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winnerPattern) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
            if (posval1 === posval2 && posval2 === posval3) {
                document.getElementById("msg").innerHTML =
                    `<span class="blink">🎉Congratulations! ${posval1} Player Wins</span>`;

                boxes.forEach((box) => {
                    box.disabled = true;
                    if (box.innerText === "") {
                        box.style.backgroundColor = "#ca6d15ff";
                    }
                });
                return;
            }
        }
    }
};

restart.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "#51057d";
    });
    turn = true;

    const msgElement = document.getElementById("msg");
    msgElement.innerHTML = "Let's Play The Game";
});
