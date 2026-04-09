import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400">KnightOS</div>
          <div className="space-x-4">
            <Link href="/login" className="text-white hover:text-yellow-400">Login</Link>
            <Link href="/register" className="bg-yellow-400 text-black px-4 py-2 rounded">Sign Up</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Master Chess with <span className="text-yellow-400">AI Coaching</span>
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Play, learn, and improve with our comprehensive chess platform featuring AI-powered coaching, tactical puzzles, and real-time multiplayer.
        </p>
        <div className="space-x-4">
          <Link href="/register" className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500">
            Start Playing
          </Link>
          <Link href="/learn" className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black">
            Learn Chess
          </Link>
        </div>
      </main>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">AI Coach</h3>
            <p>Get personalized chess coaching from our advanced AI, Magnus. Understand positions, learn tactics, and improve your game.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Tactical Puzzles</h3>
            <p>Solve thousands of chess puzzles to sharpen your tactical vision. From beginner to grandmaster level.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Multiplayer</h3>
            <p>Play real-time chess matches with players worldwide. ELO-based matchmaking and various time controls.</p>
          </div>
        </div>
      </section>
    </div>
  )
}