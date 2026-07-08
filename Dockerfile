FROM ghost:5-alpine
ENV NODE_ENV=production
ENV database__client=sqlite3
ENV database__connection__filename=/var/lib/ghost/content/data/ghost.db
ENV url=https://cloud-links-ghost.onrender.com
EXPOSE 2368
