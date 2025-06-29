# Use an official Node image based on Debian
FROM node:18-bullseye

# Install system dependencies required for canvas and other native builds
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  pkg-config \
  libcairo2-dev \
  libjpeg-dev \
  libpango1.0-dev \
  libgif-dev \
  librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy project files into container
COPY . .

# Install dependencies
RUN npm install

# Build the Vite app
RUN npm run build

# Package the Electron app
RUN npm run dist

# Default command
CMD [ "bash" ]
