FROM node:20.11.0
WORKDIR /app
COPY package.json .
# COPY package-lock.json .
# RUN npm install

ARG NODE_ENV

# Install dependencies based on NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
    echo "Installing development dependencies"; \
    npm install; \
    else \
    echo "Installing production dependencies"; \
    npm install --only=production; \
    fi


COPY . .

ENV PORT 3000
EXPOSE ${PORT}
# CMD ["node", "index.js"]
# CMD ["npm","run","dev"]
CMD ["node","index.js"]


















# FROM node:20.11.0
# WORKDIR /app
# COPY package.json .
# # COPY package-lock.json .
# # RUN npm install

# ARG NODE_ENV

# RUN if [ "$NODE_ENV" = "developement" ]; then \ 
#     npm install; \ 
#     else npm install --only=production \
#     fi

# COPY . .

# ENV PORT 3000
# EXPOSE ${PORT}
# # CMD ["node", "index.js"]
# # CMD ["npm","run","dev"]
# CMD ["node","index.js"]
