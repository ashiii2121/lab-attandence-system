#!/bin/sh
set -e

# Navigate to the script's directory to ensure correct paths
cd "$(dirname "$0")"

# Install dependencies
npm install

# Run the build
./node_modules/.bin/vite build