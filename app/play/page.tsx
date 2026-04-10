'use client';

import { useEffect, useMemo, useState } from 'react';
import ChessBoard from '../../components/board/ChessBoard';
import { Chess } from 'chess.js';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function PlayPage() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [status, setStatus] = useState('Your move');
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [message, setMessage] = useState('Good luck!');

  const activeColor = game.turn();
  const isPlayerTurn = activeColor === 'w';

  const syncHistory = (nextGame: Chess) => {
    setHistory(nextGame.history({ verbose: false }).map((move, index) => `${index + 1}. ${move}`));
  };

  const updateGameState = (nextGame: Chess, nextStatus = 'Your move') => {
    setGame(nextGame);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setLastMove(nextGame.history({ verbose: true }).length ? nextGame.history({ verbose: true }) : null);
    syncHistory(nextGame);
    setStatus(nextStatus);
    setMessage(nextStatus);
    if (nextGame.isGameOver()) {
      setGameOver(true);
      if (nextGame.isCheckmate()) {
        setMessage(activeColor === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate');
      } else if (nextGame.isStalemate()) {
        setMessage('Stalemate');
      } else {
        setMessage('Game over');
      }
    }
  };

  const performComputerMove = (currentGame: Chess) => {
    const moves = currentGame.moves({ verbose: true });
    if (moves.length === 0) {
      setGameOver(true);
      setMessage('Game over');
      return;
    }
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    currentGame.move({ from: randomMove.from, to: randomMove.to, promotion: 'q' });
    setGame(new Chess(currentGame.fen()));
    setLastMove({ from: randomMove.from, to: randomMove.to });
    syncHistory(currentGame);
    if (currentGame.isGameOver()) {
      setGameOver(true);
      setMessage(currentGame.isCheckmate() ? 'White wins by checkmate' : 'Game over');
    } else {
      setMessage('Your move');
    }
  };

  const handleSquareClick = (position: string) => {
    if (gameOver) return;

    const currentPiece = game.get(position);
    if (selectedSquare && possibleMoves.includes(position)) {
      try {
        const nextGame = new Chess(game.fen());
        const move = nextGame.move({ from: selectedSquare, to: position, promotion: 'q' });
        if (!move) {
          setSelectedSquare(null);
          setPossibleMoves([]);
          return;
        }
        setGame(nextGame);
        setLastMove({ from: selectedSquare, to: position });
        syncHistory(nextGame);
        setSelectedSquare(null);
        setPossibleMoves([]);
        setMessage('Waiting for opponent...');

        if (nextGame.isGameOver()) {
          setGameOver(true);
          setMessage(nextGame.isCheckmate() ? 'You won by checkmate' : 'Game over');
          return;
        }

        setTimeout(() => {
          const computerGame = new Chess(nextGame.fen());
          performComputerMove(computerGame);
        }, 800);
      } catch {
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

  const resetGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setPossibleMoves([]);
    setLastMove(null);
    setHistory([]);
    setGameOver(false);
    setWhiteTime(600);
    setBlackTime(600);
    setStatus('Your move');
    setMessage('Good luck!');
  };

  useEffect(() => {
    if (gameOver) return;
    const timer = window.setInterval(() => {
      if (game.isGameOver()) {
        setGameOver(true);
        window.clearInterval(timer);
        return;
      }
      if (activeColor === 'w') {
        setWhiteTime((time) => Math.max(time - 1, 0));
      } else {
        setBlackTime((time) => Math.max(time - 1, 0));
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeColor, gameOver, game]);

  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      setGameOver(true);
      setMessage(whiteTime === 0 ? 'Black wins by timeout' : 'White wins by timeout');
    }
  }, [whiteTime, blackTime]);

  const historyRows = useMemo(() => {
    return history.map((move, index) => (
      <li key={`${move}-${index}`} className="border-b border-white/10 py-2 text-sm text-gray-300">
        {move}
      </li>
    ));
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-darker via-chess-dark to-black px-4 py-10 text-white">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Play vs Computer</h1>
            <p className="max-w-2xl text-gray-300">
              Challenge the KnightOS AI with a classic 10-minute game. Click to move, track your time, and review every move in the history panel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6">
            <div className="rounded-2xl bg-chess-light/60 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">White</p>
              <p className="text-3xl font-semibold">{formatTime(whiteTime)}</p>
            </div>
            <div className="rounded-2xl bg-chess-light/60 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Black</p>
              <p className="text-3xl font-semibold">{formatTime(blackTime)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-[0.2em]">Status</p>
                  <p className="text-xl font-semibold text-white">{message}</p>
                </div>
                <button onClick={resetGame} className="rounded-2xl bg-chess-accent px-5 py-3 font-semibold text-chess-darker transition hover:bg-yellow-500">
                  New Game
                </button>
              </div>
              <ChessBoard
                game={game}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                lastMove={lastMove}
                onSquareClick={handleSquareClick}
                showCoords={false}
              />
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6 shadow-2xl">
            <div className="rounded-3xl bg-chess-light/80 p-5">
              <h2 className="text-xl font-bold text-chess-accent">Move History</h2>
              <ul className="mt-4 space-y-2 max-h-96 overflow-y-auto pr-2">{historyRows}</ul>
            </div>
            <div className="rounded-3xl bg-chess-light/80 p-5 space-y-4">
              <button
                type="button"
                onClick={() => setMessage('Offer a draw feature will be added soon.')}
                className="w-full rounded-2xl border border-chess-accent px-4 py-3 text-left font-semibold text-chess-accent transition hover:bg-chess-accent/10"
              >
                Offer Draw
              </button>
              <button
                type="button"
                onClick={() => {
                  setGameOver(true);
                  setMessage('You resigned');
                }}
                className="w-full rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Resign
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
