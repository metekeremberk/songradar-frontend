# SongRadar Frontend

## Prerequisites

- Node.js 18.17+

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/metekeremberk/songradar-frontend
```

2. **Navigate to the project directory**

```bash
cd songradar-frontend
```

3. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. **Environment variables**

Create a .env.local file in your songradar-frontend directory.

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_DB_URL=your_database_url
```

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features
In this app, you can
 * Login/ Sign Up with Tokens for security (Extra - Authentication)
 * See album / song / performer info
 * Add songs and albums via manual user input (MVP - Data Collection 1)
 * Add songs and albums via file selection (MVP - Data Collection 2)
 * Add songs and albums via data reading from another local database (MVP - Data Collection 3)
 * Delete album and all songs within that album (MVP - Data Collection 5)
