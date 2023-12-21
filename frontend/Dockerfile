# Build for production
FROM node:18 as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Serve the static build files using serve module.
FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["serve", "-s", "/app/build"]

