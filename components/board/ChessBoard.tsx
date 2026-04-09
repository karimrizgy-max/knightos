'use client';

import React, { useState } from 'react';
import { Chess } from 'chess.js';

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);

  const pieceSymbols: { [key: string]: string } = {
    p: '♟',
    n: '♞',
    b: '♝',
    r: '♜',
    q: '♛',
    k: '♚',
    P: '♙',
    N: '♘',
    B: '♗',
    R: '♖',
    Q: '♕',
    K: '♔',
  };

  const handleSquareClick = (square: string) => {
    const piece = game.get(square);

    // If clicking on a possible move, make the move
    if (possibleMoves.includes(square) && selectedSquare) {
      try {
        const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
        if (move) {
          setGame(new Chess(game.fen()));
          setLastMove({ from: selectedSquare, to: square });
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      } catch (error) {
        console.log('Invalid move');
      }
      return;
    }

    // If clicking on an empty square or opponent's piece, clear selection
    if (!piece) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    // If it's the current player's piece, select it and show possible moves
    if (
      (game.turn() === 'w' && piece.color === 'w') ||
      (game.turn() === 'b' && piece.color === 'b')
    ) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      setPossibleMoves(moves.map((m) => m.to));
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setPossibleMoves([]);
    setLastMove(null);
  };

  const board = game.board();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-gradient-to-br from-amber-900 to-amber-700 p-4 rounded-lg shadow-2xl">
        <div className="grid grid-cols-8 gap-0 border-4 border-amber-600 rounded">
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => {
              const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
              const piece = square ? pieceSymbols[`${square.color === 'w' ? square.type.toUpperCase() : square.type}`] : null;
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selectedSquare === position;
              const isPossibleMove = possibleMoves.includes(position);
              const isLastMoveSquare = lastMove?.from === position || lastMove?.to === position;

              return (
                <button
                  key={position}
                  onClick={() => handleSquareClick(position)}
                  className={`
                    w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative
                    transition-all duration-200 cursor-pointer font-bold text-2xl md:text-4xl
                    hover:opacity-80
                    ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                    ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
                    ${isPossibleMove ? 'ring-4 ring-green-400 ring-inset' : ''}
                    ${isLastMoveSquare && !isSelected ? 'ring-2 ring-blue-400 ring-inset' : ''}
                  `}
                >
                  {piece && (
                    <span className={`drop-shadow-lg ${square?.color === 'w' ? 'text-white' : 'text-gray-800'}`}>
                      {piece}
                    </span>
                  )}
                  
                  {/* Show dot for possible moves */}
                  {isPossibleMove && !piece && (
                    <div className="w-2 h-2 bg-green-400 rounded-full opacity-70"></div>
                  )}
                  
                  {/* Coordinate labels */}
                  {(position[1] === '1' || position[0] === 'a') && (
                    <div className="absolute bottom-1 right-1 text-xs font-bold text-gray-600 opacity-50">
                      {position[1] === '1' ? position[0] : position[1]}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-white text-center">
          <p className="font-semibold text-lg">
            {game.turn() === 'w' ? '⚪ White' : '⚫ Black'} to move
          </p>
          {game.isCheckmate() && <p className="text-red-400 font-bold text-sm mt-1">Checkmate!</p>}
          {game.isCheck() && !game.isCheckmate() && <p className="text-yellow-400 font-bold text-sm mt-1">Check!</p>}
          {game.isStalemate() && <p className="text-blue-400 font-bold text-sm mt-1">Stalemate!</p>}
        </div>

        <button
          onClick={resetGame}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors duration-200"
        >
          New Game
        </button>
      </div>

      <p className="text-gray-400 text-sm text-center">Click a piece to select it, then click a square to move</p>
    </div>
  );
};

export default ChessBoard;