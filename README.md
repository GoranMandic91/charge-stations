# Charge Stations

This repository contains a **monorepo** built with **Turborepo**, holding both **web** and **api** applications for managing an office charging system. The system is designed to allow **users** to seamlessly **reserve** and **use charging spaces** at the office for electric vehicles.

## Features

### Web Application

- `web`: a [Vite](https://vitejs.dev/) single page app
- User-friendly interface for users to view available charging lots.
- Ability to request/reserve a charging space in real-time.
- Visual feedback for active charging sessions, including availability and reservation status.
- Admin functionalities for managing charging spaces and user reservations.

### API Application

- `api`: an [Express](https://expressjs.com/) server
- RESTful API to manage charging space data and handle reservation requests.
- Provides endpoints for creating, updating, and releasing charging lots.
- Real-time polling for availability updates.
- Integrated logic to ensure charging lot availability based on high-demand duration rules and reservation queues.

### Packages

- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo
  Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

## Technology Stack

- **Turborepo**: Monorepo management for efficient code-sharing and build processes across web and API apps.
- **React**: Frontend framework for the web application.
- **Node.js & Express**: Backend API to manage business logic for the charging system.
- **MongoDB**: Database for storing charging lot data, user requests, and reservation history.
- **Material-UI**: Modern UI components for building a clean and responsive user interface.

## Use Case

Employees can log in via the web app to check available charging stations, reserve a slot, and monitor the status of their session. The API handles the backend logic, ensuring that charging lots are properly reserved and released based on demand and active sessions. Admin users can monitor overall system usage and manage charging resources.

## Using this example

This repo was generated with:

```sh
npx create-turbo@latest -e kitchen-sink
```

## Installation and Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 20.x or higher)
- [PNPM](https://pnpm.io/) (Package manager, similar to npm/yarn, version 9.1.x)

### 1. Clone the Repository

```bash
git clone git@github.com:GoranMandic91/charge-stations.git
cd charge-stations
```

### 2. Install Dependencies

After cloning the repository, you need to install the dependencies for both the **web** and **API** applications. The repository uses **Turborepo** to manage this in a monorepo structure.

```bash
pnpm install
```

### 3. Setup Environment Variables

Both the **API** and **Web** applications require environment variables to be set up. You'll need to copy the example `.env.example` files in both the `apps/api` and `apps/web` directories and create corresponding `.env` files.

#### API Application

```bash
cp apps/api/.env.example apps/api/.env
```

Fill in the necessary values in the `.env` file for the API, such as:

```bash
# Example .env file for API
PORT=3000
SECRET=secret
DB_URL=
DURATION_IN_MS=60000
```

#### Web Application

```bash
cp apps/web/.env.example apps/web/.env
```

Fill in the necessary values in the `.env` file for the Web app, such as:

```bash
# Example .env file for Web
VITE_APP_API_URL=http://localhost:3000
```

### 4. Run the Applications

You can now start both the **Web** and **API** applications using Turborepo.

#### Start Both Web and API Applications

```bash
pnpm run dev
```

This will concurrently run both the Web and API applications in development mode.

- **Web App**: Will be running on [http://localhost:3001](http://localhost:3001)
- **API**: Will be running on [http://localhost:3000](http://localhost:3000)
