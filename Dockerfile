FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# use ci instead?
RUN yarn

# Add prisma schema
COPY ./prisma/schema.prisma ./prisma/schema.prisma

# Copy .env file so that prisma can use it
COPY .env ./

# Generate Prisma client
RUN npx prisma generate

# Run separately bc different layer. Makes rebuilding image faster.
COPY . .

# Build the app
RUN yarn build

CMD ["yarn", "start"]