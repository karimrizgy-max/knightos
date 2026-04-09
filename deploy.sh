#!/bin/bash

echo "🚀 Deploying KnightOS to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
vercel --prod

echo "✅ Deployment complete!"
echo "Your KnightOS chess platform is now live on Vercel!"