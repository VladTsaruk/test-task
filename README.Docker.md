### Building and running your application

When you're ready, start your application by running:
`docker run --name movies -p 3000:3000 -e
VITE_API_URL=http://localhost:8000/api/v1
vladtsaruk/movies`.

Your application will be available at http://localhost:3000.

