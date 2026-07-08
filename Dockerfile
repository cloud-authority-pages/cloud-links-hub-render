FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY server.js .
EXPOSE 10000
ENV PORT=10000
ENV PLATFORM_NAME="Cloud Links Hub"
ENV PLATFORM_COLOR="#15171a"
ENV PLATFORM_ACCENT="#ff0095"
CMD ["node", "server.js"]
