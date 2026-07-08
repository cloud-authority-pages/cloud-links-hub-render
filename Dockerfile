FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PLATFORM_NAME="Cloud Links Ghost"
ENV PLATFORM_COLOR="#15171a"
ENV PLATFORM_ACCENT="#ff0095"
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "ghost.js"]
