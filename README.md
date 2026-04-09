# KnightOS - Chess SaaS Platform

A modern, full-stack chess platform built with Next.js 14, featuring AI-powered coaching, real-time multiplayer, and tactical training.

## Features

- **AI Coach**: Get personalized chess coaching from Claude AI
- **Interactive Chess Board**: Drag-and-drop interface with legal move validation
- **Multiplayer**: Real-time chess matches with Socket.io
- **Puzzle System**: Thousands of tactical puzzles with rating system
- **ELO Rating**: Track your progress across different time controls
- **Learning Module**: Structured lessons from beginner to advanced

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io
- **AI**: Anthropic Claude API
- **Chess Engine**: chess.js, Stockfish (WASM)

## 🚀 Deployment to Vercel

### Quick Deploy

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   Add these in Vercel dashboard (Project Settings > Environment Variables):

   ```
   DATABASE_URL=postgresql://username:password@host:5432/database
   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=https://your-project-name.vercel.app
   ANTHROPIC_API_KEY=your-anthropic-api-key
   ```

3. **Deploy**:
   - Vercel will automatically detect Next.js
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Database Setup

1. **Create PostgreSQL database** (use Supabase, Railway, or PlanetScale)
2. **Run Prisma migrations**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="your-key"
```

## Project Structure

```
knightos/
├── app/
│   ├── api/          # API routes
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Landing page
├── components/
│   └── board/
│       └── ChessBoard.tsx  # Interactive chess board
├── lib/
├── prisma/
│   └── schema.prisma # Database schema
├── types/
│   └── chess.ts      # TypeScript types
└── vercel.json       # Vercel configuration
```

## Contributing

This is a comprehensive chess platform. The core features are implemented and ready for deployment.

## License

MIT License