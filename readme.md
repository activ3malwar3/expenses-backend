# Expenses Manager Backed
This is a Node.js application built with Express.js. It provides a RESTful API for managing users and their expenses.

## Project Structure
The project is structured as follows:

- `src/`: Contains the source code of the application.
- `app.ts`: The main application file.
- - `base/`: Contains base classes and utilities for the application.
- - modules/: Contains the business logic for each module (authentication, users, expenses).
- `server.ts`: The entry point of the application.
- `package.json`: Contains the list of project dependencies and scripts.
- tsconfig.json: Contains the TypeScript compiler configuration.

## Getting Started
1. Clone the repository.
2. Install dependencies with npm install.
3. Copy .env.example to .env and fill in your environment variables.
4. Start the server with npm start.
5. API Endpoints

## Technologies
This project is a Node.js application built with Express.js. It provides a RESTful API for managing users and their expenses. Here's a brief explanation of the technologies and packages used:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It's used for building scalable network applications.

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. It adds static types to the language.

- **typeorm**: An ORM that can run in Node.js and can be used with TypeScript and JavaScript. It supports the latest JavaScript features and provides additional features that help you to develop any kind of application with the help of TypeScript.

- **pg**: Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.

- zod: A schema declaration and validation library. It's used to build and validate JavaScript objects using a fluent API.

## Structure

The project structure is organized into modules, each containing the business logic for a specific feature (authentication, users, expenses). The application's entry point is `server.ts`, and the main application file is `app.ts`. The `src/` directory contains the source code of the application. The `package.json` file contains the list of project dependencies and scripts, and tsconfig.json contains the TypeScript compiler configuration.

database
