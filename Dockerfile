FROM node
WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm", "run", "start:prod"]