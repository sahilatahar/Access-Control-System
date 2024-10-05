ARG NODE_VERSION=20.12.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY . .

# Install dependencies
RUN npm install

# Run the build script.
RUN npm run build

# Use production node environment by default.
ENV NODE_ENV production

# Copy package.json so that package manager commands can be used.
COPY package.json .

EXPOSE 3000

CMD npm start
