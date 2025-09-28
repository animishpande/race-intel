# TechBlogMarketplace

A full-stack project featuring a tech blog marketplace. This repository contains both the backend API and the frontend web UI.

## Project Structure

- `API/` — Python FastAPI backend
    - `main.py`: Main application files
    - `netflix_feed.json`: Sample data feed
    - `requirements.txt`: Python dependencies
- `web-ui/` — Next.js frontend
    - `src/`: Source code for the web UI
    - `public/`: Static assets
    - `package.json`: Frontend dependencies

## Getting Started

### Backend (API)
1. Navigate to the `API` folder:
   ```pwsh
   cd API
   ```
2. Install dependencies:
   ```pwsh
   pip install -r requirements.txt
   ```
3. Run the API server:
   ```pwsh
   fastapi dev main.py
   ```

### Frontend (web-ui)
1. Navigate to the `web-ui` folder:
   ```pwsh
   cd web-ui
   ```
2. Install dependencies:
   ```pwsh
   pnpm install
   ```
3. Start the development server:
   ```pwsh
   pnpm dev
   ```

## Features
- Tech blog feed display
- Marketplace functionality
- Modern UI with Next.js
- FastAPI backend for data and business logic

## License
MIT
