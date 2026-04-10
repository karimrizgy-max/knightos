'use client';

import { useMemo, useState } from 'react';
import ChessBoard from '../../components/board/ChessBoard';
import { Chess } from 'chess.js';

const puzzles = [
  {
    title: 'Beginner Mate in 1',
    rating: 800,
    fen: '8/8/8/8/4K3/2Q5/4k3/8 w - - 0 1',
    solution: ['c3c1'],
    hint: 'Use the queen to deliver mate.',
  },
  {
    title: 'Simple Fork',
    rating: 900,
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['f3g5'],
    hint: 'Use your knight to attack both king and rook.',
  },
  {
    title: 'Pin the Bishop',
    rating: 950,
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['c4b5'],
    hint: 'Pin the dark-squared bishop to win material.',
  },
  {
    title: 'Open the Center',
    rating: 1000,
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 0 1',
    solution: ['c3d5'],
    hint: 'A knight jump to a strong central square wins material.',
  },
  {
    title: 'Queen Attack',
    rating: 1050,
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1',
    solution: ['d1e2'],
    hint: 'Bring the queen into action to attack the center.',
  },
  {
    title: 'Simple Skewer',
    rating: 1100,
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/1NN2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1',
    solution: ['c3d5'],
    hint: 'Use the knight to create a skewer opportunity.',
  },
  {
    title: 'Pin on the Knight',
    rating: 1150,
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
    solution: ['c4b5'],
    hint: 'Pin the knight by moving your bishop.',
  },
  {
    title: 'Classic Mate Pattern',
    rating: 1200,
    fen: '4rrk1/pp3ppp/2n2n2/2qp4/8/2P2NP1/PB1QPPBP/3R1RK1 w - - 0 1',
    solution: ['d2d5'],
    hint: 'Gain space and open lines for the rooks.',
  },
  {
    title: 'Rook Lift',
    rating: 1250,
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/3P4/2P1PN2/PP3PPP/R1BQ1RK1 w - - 0 1',
    solution: ['d1c2'],
    hint: 'Lift the rook to the third rank for a powerful attack.',
  },
  {
    title: 'Hidden Mate',
    rating: 1300,
    fen: '6k1/5ppp/8/8/8/5Q2/5PPP/6K1 w - - 0 1',
    solution: ['f3c6'],
    hint: 'Use the queen to deliver a surprising mate.',
  },
];

export default function PuzzlesPage() {
  const [index, setIndex] = useState(0);
  const [game, setGame] = useState(() => new Chess(puzzles[0].fen));
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('Solve the puzzle');

  const puzzle = puzzles[index];
  const nextPuzzle = (newIndex: number) => {
    const next = newIndex % puzzles.length;
    setIndex(next);
    setGame(new Chess(puzzles[next].fen));
    setSelectedSquare(null);
    setPossibleMoves([]);
    setStep(0);
    setStatus('Solve the puzzle');
  };

  const handleSquareClick = (position: string) => {
    if (step >= puzzle.solution.length) return;

    const currentPiece = game.get(position);
    if (selectedSquare && possibleMoves.includes(position)) {
      const expectedMove = puzzle.solution[step];
      const attemptedMove = `${selectedSquare}${position}`;
      if (attemptedMove === expectedMove) {
        try {
          const nextGame = new Chess(game.fen());
          nextGame.move({ from: selectedSquare, to: position, promotion: 'q' });
          setGame(nextGame);
          setSelectedSquare(null);
          setPossibleMoves([]);
          const nextStep = step + 1;
          setStep(nextStep);
          setStatus(nextStep === puzzle.solution.length ? 'Correct! Puzzle solved.' : 'Correct! Continue to the next move.');
        } catch {
          setStatus('That move is not legal, try again.');
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      } else {
        setStatus('Wrong move. Try again.');
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
      return;
    }

    if (currentPiece && currentPiece.color === game.turn()) {
      const moves = game.moves({ square: position, verbose: true });
      setSelectedSquare(position);
      setPossibleMoves(moves.map((move) => move.to));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const statusColor = step === puzzle.solution.length ? 'text-green-300' : 'text-gray-300';

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-darker via-chess-dark to-black px-4 py-10 text-white">
      <div className="container mx-auto space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Chess Puzzles</h1>
          <p className="max-w-2xl text-gray-300">
            Practice beginner puzzles with click-to-move interaction. Solve each position by picking the correct moves and track your rating.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6 shadow-2xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Puzzle</p>
                <h2 className="text-3xl font-bold text-chess-accent">{puzzle.title}</h2>
              </div>
              <div className="rounded-3xl bg-chess-light/80 px-4 py-3 text-sm font-semibold text-gray-900">
                Rating {puzzle.rating}
              </div>
            </div>
            <ChessBoard
              game={game}
              selectedSquare={selectedSquare}
              possibleMoves={possibleMoves}
              onSquareClick={handleSquareClick}
              lastMove={null}
              showCoords={true}
            />
            <div className="mt-6 rounded-3xl bg-chess-light/80 p-5 text-gray-300">
              <p className={`text-base font-medium ${statusColor}`}>{status}</p>
              <p className="mt-3 text-sm text-gray-400">Hint: {puzzle.hint}</p>
            </div>
          </div>

          <aside className="rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6 shadow-2xl">
            <div className="space-y-6">
              <div className="rounded-3xl bg-chess-light/80 p-5">
                <h3 className="text-xl font-bold text-white">Puzzle List</h3>
                <ul className="mt-4 space-y-3">
                  {puzzles.map((item, puzzleIndex) => (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => nextPuzzle(puzzleIndex)}
                        className={`w-full rounded-2xl px-4 py-3 text-left transition ${puzzleIndex === index ? 'bg-chess-accent text-chess-darker' : 'bg-black/20 text-gray-200 hover:bg-white/5'}`}
                      >
                        <span className="block text-sm font-semibold">{item.title}</span>
                        <span className="text-xs text-gray-400">Rating {item.rating}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => nextPuzzle(index + 1)}
                className="w-full rounded-3xl bg-chess-accent px-5 py-3 font-semibold text-chess-darker transition hover:bg-yellow-500"
              >
                Next Puzzle
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
