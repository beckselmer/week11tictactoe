const cells = document.querySelectorAll('.col-4');
const turnIndicator = document.getElementById('turnIndicator');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';//the starting player is always X

//the event listener that looks for clicks on the board
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            turnIndicator.textContent = `It's ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`;

            if (checkWin()) {
                setTimeout(() => {//set a timeout for the win alert so the final move shows up
                    alert(`${currentPlayer} wins!`);
                    resetBoard();
                }, 100);
            } else if (isBoardFull()) {
                setTimeout(() => {//same timeout as above but for the tie alert
                    alert("It's a tie!");
                    resetBoard();
                }, 100);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});
//the reset button event listener
resetButton.addEventListener('click', resetBoard);

function updateTurnIndicator() {
    turnIndicator.textContent = `It's ${currentPlayer}'s turn`;
}
//function that checks the winning patterns array
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //row winning patterns
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //column winning patterns
        [0, 4, 8], [2, 4, 6] //diagonal winning patterns
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}
//this function checks to see if all the cells on the board are full
function isBoardFull() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}
//this resets the board by clearing all the cells, sets the current player to "X" and updates the turn indicator
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    currentPlayer = 'X';

    updateTurnIndicator();
}
