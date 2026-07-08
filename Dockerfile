FROM ghost:5-alpine

# Set environment to production
ENV NODE_ENV=production

# Ghost will use environment variables for configuration
# DATABASE__CLIENT, DATABASE__CONNECTION__FILENAME for SQLite
# or DATABASE__CLIENT=mysql2 etc for MySQL

EXPOSE 2368

CMD ["node", "current/index.js"]
