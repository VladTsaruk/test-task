# WebblyLab Test Task

# 📥 Local Setup

## Requirements
- Node.js (recommended 16+)
- npm or yarn
- Currently, two official plugins are available:

## Local Run
1. Clone the repository: git clone https://github.com/VladTsaruk/test-task.git
2. Install dependencies: `npm install` or `yarn install`
3. Configure environment variables (create `.env` with `API_URL`)
4. Start the development server: `npm run dev` or `yarn dev`

## Running with Docker
You can run the application with a single command using Docker.
- `docker run --name movies -p 3000:3000 -e VITE_API_URL=http://localhost:8000/api/v1 vladtsaruk/movies`
- DockerHub: `https://hub.docker.com/r/vladtsaruk/movies`
