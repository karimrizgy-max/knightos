'use client';

import { FormEvent, useMemo, useState } from 'react';
import ChessBoard from '../../components/board/ChessBoard';
import { Chess } from 'chess.js';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function CoachPage() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'I am Magnus, your grandmaster coach. Send me a position or ask for advice.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSquareClick = (position: string) => {
    const currentPiece = game.get(position);
    if (selectedSquare && possibleMoves.includes(position)) {
      try {
        const nextGame = new Chess(game.fen());
        nextGame.move({ from: selectedSquare, to: position, promotion: 'q' });
        setGame(new Chess(nextGame.fen()));
        setSelectedSquare(null);
        setPossibleMoves([]);
      } catch {
        setSelectedSquare(null);
        setPossibleMoves([]);
      }
      return;
    }

    if (currentPiece && currentPiece.color === game.turn()) {
      const moves = game.moves({ square: position, verbose: true });
      setSelectedSquare(position);
      setPossibleMoves(moves.map((m) => m.to));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const handleReset = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    const userMessage = input.trim();
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, fen: game.fen(), history: updatedMessages }),
    });

    const payload = await response.json();
    setMessages((current) => [
      ...current,
      { role: 'assistant', content: payload.response || 'I could not fetch advice right now.' },
    ]);
    setLoading(false);
  };

  const chatEntries = useMemo(
    () =>
      messages.map((message, index) => (
        <div key={`${message.role}-${index}`} className={`rounded-3xl p-4 ${message.role === 'assistant' ? 'bg-chess-light/80 text-white' : 'bg-white/5 text-gray-100'}`}>
          <p className="text-sm text-gray-400 uppercase tracking-[0.18em]">{message.role}</p>
          <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
        </div>
      )),
    [messages]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-darker via-chess-dark to-black px-4 py-10 text-white">
      <div className="container mx-auto space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">AI Coach</h1>
          <p className="max-w-2xl text-gray-300">
            Ask Magnus for chess advice, review positions, and train with an AI coach. Click pieces on the board to change the position before sending your question.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Coach Magnus</p>
                  <h2 className="text-2xl font-bold text-chess-accent">Grandmaster guidance</h2>
                </div>
                <button onClick={handleReset} className="rounded-2xl bg-chess-accent px-4 py-3 font-semibold text-chess-darker transition hover:bg-yellow-500">
                  Reset Position
                </button>
              </div>
              <ChessBoard
                game={game}
                selectedSquare={selectedSquare}
                possibleMoves={possibleMoves}
                onSquareClick={handleSquareClick}
                showCoords={true}
              />
            </div>
          </div>

          <aside className="rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="rounded-3xl bg-chess-light/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Chat</p>
                <div className="mt-4 space-y-4 max-h-[520px] overflow-y-auto pr-2">{chatEntries}</div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={4}
                  placeholder="Ask Magnus for advice..."
                  className="w-full rounded-3xl border border-chess-light/20 bg-chess-dark px-4 py-3 text-white outline-none transition focus:border-chess-accent"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-chess-accent px-5 py-3 font-semibold text-chess-darker transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Thinking...' : 'Send to Magnus'}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
