FROM node:18-alpine
WORKDIR /app

COPY node_modules ./node_modules
COPY build ./

COPY package.json .
ENV NODE_ENV=production
EXPOSE 5000/tcp

CMD [ "node", "-r", "/app/index.js" ]

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD (curl --fail http://localhost:5000/health) || exit 1