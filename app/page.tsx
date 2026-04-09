import Link from 'next/link'
import ChessBoard from '../components/board/ChessBoard'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-darker via-chess-dark to-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/80 backdrop-blur-md border-b border-chess-light/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-chess-accent rounded-full flex items-center justify-center">
                <span className="text-chess-darker font-bold text-sm">♞</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-chess-accent to-yellow-300 bg-clip-text text-transparent">
                KnightOS
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-chess-accent transition-colors duration-200">Features</Link>
              <Link href="#about" className="text-gray-300 hover:text-chess-accent transition-colors duration-200">About</Link>
              <Link href="#pricing" className="text-gray-300 hover:text-chess-accent transition-colors duration-200">Pricing</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-chess-accent transition-colors duration-200">Login</Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-chess-accent to-chess-accent-dark text-chess-darker px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-chess-accent/25 transition-all duration-200 transform hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Master Chess with{' '}
                  <span className="bg-gradient-to-r from-chess-accent via-yellow-400 to-chess-accent bg-clip-text text-transparent animate-bounce-gentle">
                    AI Coaching
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Elevate your chess game with personalized AI coaching, tactical puzzles, and real-time multiplayer battles. Join thousands of players improving their skills.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-chess-accent to-chess-accent-dark text-chess-darker px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-chess-accent/30 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Start Your Journey
                </Link>
                <Link
                  href="#demo"
                  className="border-2 border-chess-accent text-chess-accent px-8 py-4 rounded-xl font-bold text-lg hover:bg-chess-accent hover:text-chess-darker transition-all duration-300 text-center"
                >
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>10,000+ Active Players</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>AI-Powered Coaching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Real-time Multiplayer</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-2xl shadow-2xl border border-chess-light/20">
                <ChessBoard />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-chess-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chess-accent/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-chess-dark/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-chess-accent">KnightOS</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the most advanced chess platform with cutting-edge AI technology and immersive gameplay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-xl border border-chess-light/20 hover:border-chess-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-chess-accent/10">
              <div className="w-16 h-16 bg-chess-accent/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-chess-accent">AI Coach Magnus</h3>
              <p className="text-gray-300 leading-relaxed">
                Get personalized chess coaching from our advanced AI. Understand complex positions, learn tactical patterns, and receive instant feedback on your moves.
              </p>
            </div>

            <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-xl border border-chess-light/20 hover:border-chess-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-chess-accent/10">
              <div className="w-16 h-16 bg-chess-accent/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🧩</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-chess-accent">Tactical Puzzles</h3>
              <p className="text-gray-300 leading-relaxed">
                Sharpen your tactical vision with thousands of puzzles. From beginner-friendly mates to grandmaster-level combinations, improve your calculation skills.
              </p>
            </div>

            <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-xl border border-chess-light/20 hover:border-chess-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-chess-accent/10">
              <div className="w-16 h-16 bg-chess-accent/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-chess-accent">Real-time Multiplayer</h3>
              <p className="text-gray-300 leading-relaxed">
                Play live chess matches with players worldwide. ELO-based matchmaking, multiple time controls, and a fair competitive environment.
              </p>
            </div>

            <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-xl border border-chess-light/20 hover:border-chess-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-chess-accent/10">
              <div className="w-16 h-16 bg-chess-accent/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-chess-accent">Advanced Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                Track your progress with detailed statistics, game analysis, and performance metrics. Understand your strengths and areas for improvement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-xl border border-chess-light/20 hover:border-chess-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-chess-accent/10">
              <div className="w-16 h-16 bg-chess-accent/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-chess-accent">Structured Learning</h3>
              <p className="text-gray-300 leading-relaxed">
                Follow our comprehensive learning paths from beginner to advanced. Master openings, middlegame, and endgame with guided lessons.
              </p>
            </div>

            <div className="bg-gradient-to-br from-chess-light to-chess-dark p-8 rounded-xl border border-chess-light/20 hover:border-chess-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-chess-accent/10">
              <div className="w-16 h-16 bg-chess-accent/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-chess-accent">Tournaments</h3>
              <p className="text-gray-300 leading-relaxed">
                Compete in regular tournaments and events. Win prizes, climb leaderboards, and prove your chess mastery against the best players.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-chess-accent/10 to-chess-accent-dark/10 border border-chess-accent/20 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Master Chess?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players who are already improving their chess skills with KnightOS. Start your journey today and unlock your full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-chess-accent to-chess-accent-dark text-chess-darker px-10 py-4 rounded-xl font-bold text-xl hover:shadow-xl hover:shadow-chess-accent/30 transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-chess-accent text-chess-accent px-10 py-4 rounded-xl font-bold text-xl hover:bg-chess-accent hover:text-chess-darker transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chess-dark border-t border-chess-light/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-chess-accent rounded-full flex items-center justify-center">
                  <span className="text-chess-darker font-bold text-sm">♞</span>
                </div>
                <span className="text-xl font-bold text-chess-accent">KnightOS</span>
              </div>
              <p className="text-gray-400">
                The ultimate chess platform for players of all levels.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-chess-accent">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/play" className="hover:text-chess-accent transition-colors">Play Chess</Link></li>
                <li><Link href="/learn" className="hover:text-chess-accent transition-colors">Learn</Link></li>
                <li><Link href="/puzzles" className="hover:text-chess-accent transition-colors">Puzzles</Link></li>
                <li><Link href="/tournaments" className="hover:text-chess-accent transition-colors">Tournaments</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-chess-accent">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-chess-accent transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-chess-accent transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-chess-accent transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-chess-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-chess-accent">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-chess-accent transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-chess-accent transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-chess-accent transition-colors">Terms</Link></li>
                <li><Link href="/status" className="hover:text-chess-accent transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-chess-light/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KnightOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}