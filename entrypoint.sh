#!/bin/sh
echo "window.ENV = { API_URL: \"${API_URL}\" };" > /usr/src/app/dist/env.js

exec npx serve -s dist --listen tcp://0.0.0.0:3000