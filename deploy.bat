@echo off
echo 🚀 Deploying KnightOS to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
)

REM Deploy to Vercel
vercel --prod

echo ✅ Deployment complete!
echo Your KnightOS chess platform is now live on Vercel!
pause