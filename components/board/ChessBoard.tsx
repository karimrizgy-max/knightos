'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Chess } from 'chess.js';

export interface ChessBoardProps {
  game?: Chess;
  selectedSquare?: string | null;
  possibleMoves?: string[];
  onSquareClick?: (square: string) => void;
  lastMove?: { from: string; to: string } | null;
  showCoords?: boolean;
  className?: string;
  onReset?: () => void;
}

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

const ChessBoard: React.FC<ChessBoardProps> = ({
  game: controlledGame,
  selectedSquare,
  possibleMoves,
  onSquareClick,
  lastMove,
  showCoords = true,
  className = '',
  onReset,
}) => {
  const [internalGame, setInternalGame] = useState<Chess>(() => new Chess());
  const [localSelected, setLocalSelected] = useState<string | null>(null);
  const [localMoves, setLocalMoves] = useState<string[]>([]);

  const isControlled = Boolean(controlledGame && onSquareClick);
  const game = controlledGame ?? internalGame;
  const selected = selectedSquare ?? localSelected;
  const highlighted = possibleMoves ?? localMoves;

  useEffect(() => {
    if (!isControlled) return;
    setLocalSelected(null);
    setLocalMoves([]);
  }, [controlledGame, isControlled]);

  const handleClick = (position: string) => {
    if (isControlled && onSquareClick) {
      onSquareClick(position);
      return;
    }

    const moves = game.moves({ square: position, verbose: true });
    if (selected && highlighted.includes(position)) {
      try {
        const move = game.move({ from: selected, to: position, promotion: 'q' });
        if (move) {
          setInternalGame(new Chess(game.fen()));
          setLocalSelected(null);
          setLocalMoves([]);
          return;
        }
      } catch {
        // invalid move
      }
      setLocalSelected(null);
      setLocalMoves([]);
      return;
    }

    if (moves.length > 0) {
      setLocalSelected(position);
      setLocalMoves(moves.map((m: any) => m.to));
    } else {
      setLocalSelected(null);
      setLocalMoves([]);
    }
  };

  const board = useMemo(() => game.board(), [game]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="bg-gradient-to-br from-amber-900 to-amber-700 p-4 rounded-3xl shadow-2xl border border-amber-600/60">
        <div className="grid grid-cols-8 gap-0 rounded-xl overflow-hidden border-2 border-transparent">
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => {
              const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
              const piece = square ? (square.color === 'w' ? square.type.toUpperCase() : square.type.toLowerCase()) : null;
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selected === position;
              const isHighlighted = highlighted.includes(position);
              const isLast = lastMove?.from === position || lastMove?.to === position;

              return (
                <button
                  key={position}
                  type="button"
                  onClick={() => handleClick(position)}
                  className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center relative transition-all duration-200 focus:outline-none ${
                    isLight ? 'bg-amber-100' : 'bg-amber-800'
                  } ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''} ${
                    isHighlighted ? 'ring-4 ring-green-400 ring-inset' : ''
                  } ${isLast ? 'ring-2 ring-blue-400 ring-inset' : ''} hover:opacity-90`}
                >
                  {piece ? (
                    <span className={`text-3xl md:text-4xl ${square.color === 'w' ? 'text-white' : 'text-gray-900'}`}>
                      {pieceSymbols[piece]}
                    </span>
                  ) : isHighlighted ? (
                    <span className="w-2 h-2 rounded-full bg-green-400 opacity-80" />
                  ) : null}
                  {showCoords && (
                    <span className="pointer-events-none absolute bottom-1 right-1 text-[10px] text-neutral-500">
                      {position}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
      {!isControlled && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors duration-200"
        >
          New Game
        </button>
      )}
    </div>
  );
};

export default ChessBoard;
