'use client';

import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Chess } from 'chess.js';

interface ChessPieceProps {
  piece: string;
  position: string;
  onMove: (from: string, to: string) => void;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, position, onMove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const pieceSymbols: { [key: string]: string } = {
    'p': '♟', 'n': '♞', 'b': '♗', 'r': '♜', 'q': '♛', 'k': '♚',
    'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
  };

  const isWhite = piece === piece.toUpperCase();

  return (
    <div
      ref={(node) => drag(node)}
      className={`
        w-full h-full flex items-center justify-center text-4xl cursor-grab select-none
        transition-all duration-200 hover:scale-110
        ${isDragging ? 'opacity-50 scale-110' : 'opacity-100'}
        ${isWhite ? 'text-white drop-shadow-lg' : 'text-gray-800 drop-shadow-lg'}
      `}
      style={{
        filter: isWhite ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' : 'drop-shadow(2px 2px 4px rgba(255,255,255,0.3))'
      }}
    >
      {pieceSymbols[piece]}
    </div>
  );
};

interface ChessSquareProps {
  piece: string | null;
  isLight: boolean;
  position: string;
  isHighlighted: boolean;
  isLastMove: boolean;
  onMove: (from: string, to: string) => void;
  onDrop: (item: any, position: string) => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  piece,
  isLight,
  position,
  isHighlighted,
  isLastMove,
  onMove,
  onDrop
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item: any) => onDrop(item, position),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`
        w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative
        transition-all duration-200
        ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
        ${isHighlighted ? 'ring-4 ring-yellow-400 ring-opacity-70' : ''}
        ${isLastMove ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
        ${isOver && canDrop ? 'bg-green-400 bg-opacity-50' : ''}
        ${isOver && !canDrop ? 'bg-red-400 bg-opacity-50' : ''}
      `}
    >
      {piece && (
        <ChessPiece
          piece={piece}
          position={position}
          onMove={onMove}
        />
      )}
      {/* Coordinate labels */}
      {(position[1] === '1' || position[0] === 'a') && (
        <div className="absolute bottom-0 right-0 text-xs font-bold text-gray-600 p-1">
          {position[1] === '1' ? position[0] : position[1]}
        </div>
      )}
    </div>
  );
};

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{from: string, to: string} | null>(null);

  const makeMove = (from: string, to: string) => {
    try {
      const move = game.move({ from, to, promotion: 'q' });
      if (move) {
        setGame(new Chess(game.fen()));
        setLastMove({ from, to });
        setHighlightedSquares([]);
      }
    } catch (error) {
      console.log('Invalid move');
    }
  };

  const handleDrop = (item: any, position: string) => {
    makeMove(item.position, position);
  };

  const getPossibleMoves = (square: string) => {
    const moves = game.moves({ square, verbose: true });
    setHighlightedSquares(moves.map(move => move.to));
  };

  const resetGame = () => {
    setGame(new Chess());
    setHighlightedSquares([]);
    setLastMove(null);
  };

  const board = game.board();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-gradient-to-br from-amber-900 to-amber-700 p-4 rounded-lg shadow-2xl">
          <div className="grid grid-cols-8 gap-0 border-4 border-amber-600 rounded">
            {board.map((row, rowIndex) =>
              row.map((square, colIndex) => {
                const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
                const piece = square ? (square.color === 'w' ? square.type.toUpperCase() : square.type.toLowerCase()) : null;
                const isLight = (rowIndex + colIndex) % 2 === 0;

                return (
                  <ChessSquare
                    key={position}
                    piece={piece}
                    isLight={isLight}
                    position={position}
                    isHighlighted={highlightedSquares.includes(position)}
                    isLastMove={lastMove?.from === position || lastMove?.to === position}
                    onMove={makeMove}
                    onDrop={handleDrop}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors duration-200"
          >
            New Game
          </button>
          <div className="text-white text-center">
            <p className="font-semibold">
              {game.turn() === 'w' ? 'White' : 'Black'} to move
            </p>
            {game.isCheckmate() && <p className="text-red-400 font-bold">Checkmate!</p>}
            {game.isCheck() && !game.isCheckmate() && <p className="text-yellow-400 font-bold">Check!</p>}
            {game.isStalemate() && <p className="text-blue-400 font-bold">Stalemate!</p>}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ChessBoard;