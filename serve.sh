#!/bin/bash
# Simple local server for testing (no Jekyll required for testing HTML structure)
# The actual GitHub Pages deployment will run Jekyll server-side

echo "Starting local server on http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""
echo "Note: Template variables like {{ site.baseurl }} won't render."
echo "For full testing, use Jekyll or push to GitHub Pages."
echo ""

python3 -m http.server 8000
