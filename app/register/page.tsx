'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-darker via-chess-dark to-black px-4 py-16 text-white">
      <div className="container mx-auto max-w-xl rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-3">Create Your Account</h1>
        <p className="text-gray-400 mb-8">Sign up for KnightOS and start improving your chess with AI coaching and puzzles.</p>

        <div className="space-y-6">
          <label className="block">
            <span className="text-sm text-gray-300">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="John Doe"
              className="mt-2 w-full rounded-3xl border border-chess-light/20 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-chess-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-3xl border border-chess-light/20 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-chess-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className="mt-2 w-full rounded-3xl border border-chess-light/20 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-chess-accent"
            />
          </label>
          <button className="w-full rounded-3xl bg-chess-accent px-6 py-3 text-chess-darker font-semibold transition hover:bg-yellow-500">
            Register
          </button>
        </div>

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-chess-accent hover:text-yellow-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
