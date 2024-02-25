# StrawPoll

This project is the backend for a clone of StrawPoll.com, designed to work in tandem with the [frontend application](https://github.com/avanrish/strawpoll-web). It is built using NestJS and leverages MikroORM for database interactions.

## Features

- REST API endpoints to manage polls and votes.
- Integration with PostgreSQL using MikroORM.
- Docker support for easy setup and deployment.

## Prerequisites

- [Docker](https://www.docker.com/) (recommended for installation).
- Node.js (if not using Docker).
- A PostgreSQL database (if not using Docker).

## Installation and Setup

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/avanrish/strawpoll-api
   ```
2. Navigate to the project directory:
   ```bash
   cd strawpoll-api
   ```
3. Rename `.env.example` to `.env` and adjust the environment variables as needed.
4. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

### Without Docker

1. Ensure you have a running instance of PostgreSQL.
2. Rename `.env.example` to `.env` and set `POSTGRES_HOST` to your database host (e.g., `localhost`).
3. Install dependencies:
   ```bash
   pnpm install
   ```
   You can also use `npm` or `yarn`.
4. Build the application:
   ```bash
   pnpm build
   ```
5. Start the application:
   ```bash
   pnpm start
   ```

## Usage

Once the backend is up and running, you can start using the API endpoints. The OpenAPI (Swagger) documentation is available at `http://localhost:4000/docs/api`, providing a detailed description of available endpoints and their usage.

## Frontend Integration

This backend is designed to work with a corresponding frontend application. Please set up the frontend from [this repository](https://github.com/avanrish/strawpoll-web) to fully utilize the functionality of the StrawPoll clone.

## License

[MIT](LICENSE.md)
