const cells = document.querySelectorAll('.cell');
const restart = document.getElementById('restart');
const message = document.getElementById('message');

let curPlayer = 'X';
let array = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function cellClick(event) {
    const curCell = event.target;
    const curCellIndex = parseInt(curCell.getAttribute('data-index'));
    
    if (!isGameActive || array[curCellIndex] !== '') {
        return;
    }
    
    array[curCellIndex] = curPlayer;
    curCell.textContent = curPlayer;
    checkWinner();
    curPlayer = (curPlayer === 'X') ? 'O' : 'X';
}

function checkWinner() {
    for(let i = 0; i < win.length; i++) {
        const el1 = array[win[i][0]];
        const el2 = array[win[i][1]];
        const el3 = array[win[i][2]];

        if (el1 === '' || el2 === '' || el3 === '') {
            continue;
        }
        
        if (el1 === el2 && el1 === el3) {
            highlightWinningCells([win[i][0], win[i][1], win[i][2]]);
            message.textContent = `Winner: Player ${curPlayer}!`;
            isGameActive = false;
            return;
        }
    }

    if (!array.includes('')) {
        message.textContent = `Winner: Player X && Player O!`;
        isGameActive = false;
        return;
    }
}

const highlightWinningCells = (winCells) => {
    winCells.forEach((index) => {
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.classList.add('highlight'); 
    });
};

function restartGame() {
    message.textContent = 'Game in process (^.^)';
    array = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    curPlayer = 'X';
    cells.forEach((cell) => {
        cell.textContent = ''; 
        cell.style.backgroundColor = ''; 
        cell.classList.remove('highlight'); 
    });
}

cells.forEach(cell => cell.addEventListener('click', cellClick));
restart.addEventListener('click', restartGame);