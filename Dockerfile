FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY server.js .
RUN mkdir -p /app/data
EXPOSE 10000
ENV PORT=10000
ENV PLATFORM_NAME="Cloud Links Hub"
ENV PLATFORM_COLOR="#15171a"
ENV PLATFORM_ACCENT="#ff0095"
ENV ADMIN_API_KEY="cloud-links-ghost-admin-2024"
CMD ["node", "server.js"]
