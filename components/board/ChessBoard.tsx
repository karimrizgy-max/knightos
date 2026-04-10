'use client';

import React, { useState } from 'react';
import { Chess } from 'chess.js';

const pieceSymbols: { [key: string]: string } = {
  'p': 'p', 'n': 'n', 'b': 'b', 'r': 'r', 'q': 'q', 'k': 'k',
  'P': 'P', 'N': 'N', 'B': 'B', 'R': 'R', 'Q': 'Q', 'K': 'K'
};

const ChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState<string[]>([]);

  const handleClick = (position: string) => {
    if (selected) {
      try {
        const move = game.move({ from: selected, to: position, promotion: 'q' });
        if (move) {
          setGame(new Chess(game.fen()));
          setSelected(null);
          setHighlighted([]);
          return;
        }
      } catch {}
      setSelected(null);
      setHighlighted([]);
    } else {
      const moves = game.moves({ square: position, verbose: true });
      if (moves.length > 0) {
        setSelected(position);
        setHighlighted(moves.map((m: any) => m.to));
      }
    }
  };

  const board = game.board();

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
      <div style={{padding:16,background:'#b58863',borderRadius:8}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(8,64px)'}}>
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => {
              const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
              const piece = square ? (square.color === 'w' ? square.type.toUpperCase() : square.type.toLowerCase()) : null;
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selected === position;
              const isHighlighted = highlighted.includes(position);
              return (
                <div key={position} onClick={() => handleClick(position)}
                  style={{width:64,height:64,background:isSelected?'#f6f669':isHighlighted?'#cdd16a':isLight?'#f0d9b5':'#b58863',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,cursor:'pointer'}}>
                  {piece || ''}
                </div>
              );
            })
          )}
        </div>
      </div>
      <button onClick={() => {setGame(new Chess());setSelected(null);setHighlighted([]);}}
        style={{padding:'8px 24px',background:'#b58863',color:'white',borderRadius:8,border:'none',cursor:'pointer'}}>
        New Game
      </button>
    </div>
  );
};

export default ChessBoard;
