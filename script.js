function Cell() {
  let value;

  const addToken = (playerToken) => {
    value = playerToken;
  };

  const getCellValue = () => value;

  return { addToken, getCellValue };
}

function Gameboard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(Cell());
  }
  const getBoard = () => board;
  const playToken = (index, playerToken) => {
    if (!board[index].getCellValue()) {
      board[index].addToken(playerToken);
    }
  };
  return { getBoard, playToken };
}

function GameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
  const board = Gameboard();
  const playersArray = [
    {
      name: playerOneName,
      token: 'X',
    },
    {
      name: playerTwoName,
      token: 'O',
    },
  ];
  let activePlayer = playersArray[0];
  const switchPlayerTurn = () => {
    if (activePlayer === playersArray[0]) {
      activePlayer = playersArray[1];
    } else {
      activePlayer = playersArray[0];
    }
  };
  const getActivePlayer = () => activePlayer;

  const checkWinner = (index) => {
    const indexNumber = parseInt(index);
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // make an array with possible winners for current index
    const indexWinners = [];
    const currentPlayerToken = board.getBoard()[indexNumber].getCellValue();
    console.log(currentPlayerToken);
    winningCombinations.forEach((subArray) => {
      console.log(`checking for matches in subArray ${subArray}`);
      let tokenCount = 0;
      for (let i = 0; i < 3; i++) {
        console.log(subArray[i]);
        console.log(board.getBoard()[subArray[i]].getCellValue());
        if (currentPlayerToken === board.getBoard()[subArray[i]].getCellValue()) {
          tokenCount++;
          console.log(`Its a match! The current token count is ${tokenCount}`);
        }
      }
      if (tokenCount === 3) {
        console.log('WE HAVE A WINNER!!!!!');
        return true;
      } return false;
    });
    // const indexWinners = winningCombinations.filter((subArray) => subArray.includes(indexNumber));
  };

  const playRound = (index) => {
    // if statement makes sure player cant play over another piece
    if (!board.getBoard()[index].getCellValue()) {
      console.log(`${getActivePlayer().name}'s token into cell ${index}...`);
      board.playToken(index, getActivePlayer().token);
      console.log(checkWinner(index));
      switchPlayerTurn();
    }
  };

  const getBoard = () => board.getBoard();
  return { playRound, getActivePlayer, getBoard };
}

function DisplayController() {
  const game = GameController();
  const messageBar = document.querySelector('.message');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    boardDiv.textContent = ''; // clear the board

    const activePlayer = game.getActivePlayer();

    messageBar.textContent = `${activePlayer.name}'s turn. (${activePlayer.token})`;

    // Render the board on the boardDiv
    for (let i = 0; i < 9; i++) {
      const cellButton = document.createElement('button');
      cellButton.classList.add('cell');
      cellButton.setAttribute('id', i);
      cellButton.textContent = game.getBoard()[i].getCellValue();
      boardDiv.appendChild(cellButton);
    }
  };

  function clickHandlerBoard(e) {
    const selectedCell = e.target.id;
    // console.log(`Selected cell ${selectedCell}`);
    game.playRound(selectedCell);
    updateScreen();
  }

  boardDiv.addEventListener('click', clickHandlerBoard);
  updateScreen();
  return { updateScreen };
}
const display = DisplayController();
