const pStatus = document.querySelector("#status");
const cells = document.querySelectorAll(".container div");
const resetBtn = document.querySelector("#resetBtn");

let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 4, 8], [2, 4, 6], [0, 3, 6],
    [1, 4, 7], [2, 5, 8]
];

let turn = true;
let winGame = false;
let countTurn = 0;

function valueAssign(cell) {
    if (cell.textContent !== "") {
        return;
    }
    if (winGame) {
        return;
    }
    countTurn++;
    if (turn) {
        cell.textContent = "O";
        turn = false;
        pStatus.textContent = "Player: X turn";
    } else {
        turn = true;
        cell.classList.add("x");
        pStatus.textContent = "Player: O turn";
        cell.textContent = "X";
    }
    checkWinner();

    if (countTurn === 9 && !winGame) {
        pStatus.textContent = "The Match Was Draw!"
        winGame = true;
    }
}

function checkWinner() {
    winPatterns.forEach((pattern) => {
        let a = cells[pattern[0]].innerText;
        let b = cells[pattern[1]].innerText;
        let c = cells[pattern[2]].innerText;
        if (a !== "" && b !== "" && c !== "") {
            if (a === b && b === c) {
                showWinner(a, pattern);
            }
        }
    })
}

function showWinner(winner, pattern) {
    winGame = true;
    pStatus.textContent = `Winner is: ${winner} 😎`;
    pattern.forEach((index) => {
        cells[index].classList.add("highlight");
    })
}

function resetGame() {
    turn = true;
    winGame = false;
    countTurn = 0;
    cells.forEach((cell) => {
        cell.innerText = "";
        cell.classList.remove("x");
        cell.classList.remove("highlight");
    })
    pStatus.textContent = "Player: O turn"
}


cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        valueAssign(cell);
    })
})

resetBtn.addEventListener("click", () => {
    resetGame();
})


