'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-darker via-chess-dark to-black px-4 py-16 text-white">
      <div className="container mx-auto max-w-xl rounded-3xl border border-chess-light/20 bg-chess-dark/80 p-10 shadow-2xl">
        <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Login to access your KnightOS chess dashboard and continue training.</p>

        <div className="space-y-6">
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
              placeholder="Enter your password"
              className="mt-2 w-full rounded-3xl border border-chess-light/20 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-chess-accent"
            />
          </label>
          <button className="w-full rounded-3xl bg-chess-accent px-6 py-3 text-chess-darker font-semibold transition hover:bg-yellow-500">
            Login
          </button>
        </div>

        <p className="mt-8 text-center text-gray-400">
          New to KnightOS?{' '}
          <Link href="/register" className="text-chess-accent hover:text-yellow-300">
            Create an account.
          </Link>
        </p>
      </div>
    </div>
  );
}
