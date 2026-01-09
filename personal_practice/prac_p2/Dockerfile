FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]

# FROM : Use a lightweight nodejs env
# WORKDIR: create a directory inside the contianer where the app will live
# COPY: copy the package files first (trick to make builds faster (caching))
# RUN: Install dependecies (express)
# COPY . . : Copy everything else from local folder into the contianer, includes app.js AND the public/ with template and styles
# EXPOSE: Tell the contianer to listen on port 8080
# CMD: the command to start the app
