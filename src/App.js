// TicTacToe.js
import React, { useState } from 'react';
import './App.css';

const TicTacToe = () =>
{
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winningMessage = () => `Player ${currentPlayer === 'X' ? 'O' : 'X'} has won!`;
  const drawMessage = () => 'Game ended in a draw!';
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

  const handleCellClick = (index) =>
  {
    if (gameState[index] !== '' || !gameActive)
    {
      return;
    }

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    handleResultValidation();
  };

  const handleResultValidation = () =>
  {
    let roundWon = false;

    for (let i = 0; i <= 7; i++)
    {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (a === '' || b === '' || c === '')
      {
        continue;
      }

      if (a === b && b === c)
      {
        roundWon = true;
        break;
      }
    }

    if (roundWon)
    {
      alert(winningMessage());
      setGameActive(false);
      return;
    }

    let roundDraw = !gameState.includes('');

    if (roundDraw)
    {
      alert(drawMessage());
      setGameActive(false);
      return;
    }

    handlePlayerChange();
  };

  const handlePlayerChange = () =>
  {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleRestartGame = () =>
  {
    setGameActive(true);
    setCurrentPlayer('X');
    setGameState(Array(9).fill(''));
  };

  return (
    <div className="tic-tac-toe">
      <h1 className="game--title">Tic Tac Toe</h1>
      <div className="game--container">
        {gameState.map((cell, index) => (
          <div
            key={index}
            data-cell-index={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <h2 className="game--status">{currentPlayerTurn()}</h2>
      <button className="game--restart" onClick={handleRestartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
