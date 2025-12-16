#!/bin/bash
# Build script for Render deployment
# This script prepares and builds the Next.js frontend

set -e  # Exit on any error

echo "======================================"
echo "Starting Render build process..."
echo "======================================"

# Display Node and npm versions
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm@latest
fi

echo "pnpm version: $(pnpm --version)"

# Clean install dependencies
echo "Installing dependencies..."
pnpm install --frozen-lockfile

# Build the Next.js application
echo "Building Next.js application..."
pnpm run build

echo "======================================"
echo "Build completed successfully!"
echo "======================================"

# Display build output size
if [ -d ".next" ]; then
    echo "Build output:"
    du -sh .next
fi
