import React, { useState } from 'react';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (!gameStarted || board[i] || calculateWinner(board)) return;
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStarted(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "Game is a draw!" 
    : gameStarted 
    ? `Current player: ${xIsNext ? 'X' : 'O'}`
    : "Click 'Start Game' to begin";

  const renderSquare = (i) => (
    <button 
      className="game-square" 
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );

  return (
    <div className="game-container">
      <div className="game-status">{status}</div>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-actions">
        <button 
          className="game-button"
          onClick={startNewGame}
        >
          {gameStarted ? 'Restart Game' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default Game;
