# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16 as build

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production

RUN yarn install 



# Copy local code to the container image.
COPY . ./
RUN yarn run generate

FROM javieraviles/zip
WORKDIR /usr/src/app/dist
COPY --from=build /usr/src/app/dist /usr/src/app/dist
RUN mkdir -p ../output && zip -r ../output/dist.zip *