# Define the base image with Node.js
FROM node:16-alpine

RUN apk add --no-cache --update curl

# Create app directory in Docker
WORKDIR ./src

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# If building code for production
# RUN npm ci --only=production

# Bundle app source in Docker
COPY . .

# Transpile typescript files to javascript
# RUN npm build

# Expose the port server will listened to
EXPOSE 9001

# Define the command to run app
CMD [ "npm", "start"]