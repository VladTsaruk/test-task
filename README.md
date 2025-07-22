# WebblyLab Test Task

# 📥 Local Setup

## Requirements
- Node.js
- npm or yarn

## Local Run
1. Clone the repository: `git clone https://github.com/VladTsaruk/test-task.git`
2. Install dependencies: `npm install` or `yarn install`
3. Configure API_URL in `public/env.js` change `API_URL` on your API
4. Start the development server: `npm run dev` or `yarn dev`

## Running with Docker
You can run the application with a single command using Docker.
- `docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 vladtsaruk/movies`
- DockerHub: `https://hub.docker.com/r/vladtsaruk/movies`
