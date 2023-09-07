# CODECADEMY

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A Node.js application using Express, MySQL, and Sequelize for a take-home assignment.

## Table of Contents

- [CODECADEMY](#codecademy)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Frameworks and Libraries](#frameworks-and-libraries)
  - [Database Schema](#database-schema)
  - [Testing](#testing)
  - [Alternate: Using docker and docker compose](#alternate-using-docker-and-docker-compose)
    - [Prerequisites](#prerequisites)
    - [Running the Application with Docker Compose](#running-the-application-with-docker-compose)
  - [API docs](#api-docs)
  - [Author](#author)
  - [License](#license)

## Setup

Before you begin, ensure you have Node.js and MySQL installed on your machine.

1. Clone the repository:
   ```
   git clone https://github.com/sachinkapalidigi/code-academy
   ```
2. Navigate to the project directory:
   ```
   cd code-academy
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your configurations (DB_NAME, DB_USER, DB_PASSWORD, etc.).
5. Create a MySQL database and update the .env file with the database name and credentials:
   ```sql
   CREATE DATABASE your_database_name;
   ```
6. Run the application:
   ```
   npm start
   ```

## Usage

- To start the application in development mode, use:
  ```
  npm run dev
  ```

- Access the application at `http://localhost:8080` (or the port specified in your `.env` file).

## Frameworks and Libraries

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize**: A promise-based Node.js ORM for MySQL, SQLite, PostgreSQL, and more.
- **MySQL2**: MySQL client for Node.js with focus on performance.
- **Joi**: Object schema description language and validator for JavaScript objects.
- Other utilities: bcrypt, cors, dotenv, express-rate-limit, helmet, hpp, jsonwebtoken, morgan, xss-clean, nodemon (dev).

## Database Schema

1. `user` table:

- `id`: BIGINT, Primary Key, Auto Increment
- `username`: STRING, Not Null, Unique
- `password`: STRING, Not Null
- `full_name`: STRING, Not Null
- `age`: INTEGER, Not Null
- `gender`: STRING, Not Null

2. `image` table:

- `id`: BIGINT, Primary Key, Auto Increment
- `file_name`: STRING, Not Null
- `original_name`: STRING, Not Null
- `mime_type`: STRING, Not Null
- `location`: STRING, Not Null
- `size`: INTEGER, Not null
- `user_id`: BIGINT, Foreign Key to `user.id`, Not Null

```
[user]                  [image]
+------------+          +---------------+
| id         |----------| user_id       |
| username   | 1      n | file_name     |
| email      |          | original_name |
| password   |          | id            |
| fullName   |          +---------------+
| age        |
| gender     |
+------------+

```

In this ERD:

- The arrow (`----------`) represents a one-to-many relationship from the `user` table to the `image` table.
- The numbers `1` and `n` represent the cardinality of the relationship. One user can have many images, but each image can only belong to one user.

## Testing

- **MySQL must be up and running**
- `npm run test` will run the tests.


## Alternate: Using docker and docker compose

### Prerequisites

1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
2. Clone the repository.

```bash
git clone https://github.com/sachinkapalidigi/code-academy.git
```

3. Navigate to the project directory.

```bash
cd code-academy
```

4. Create an `.env` file in the root directory using the example provided in `.env.example` as a template. Replace the placeholder values with your configuration. Although not required since env variables are added in docker-compose file (<span style="color:red">WARNING</span>: only for the local development use case).

### Running the Application with Docker Compose

1. Build and start the application containers using Docker Compose.

```bash
docker-compose -f docker-compose.local.yml up --build
```

2. Access the application at `http://localhost:8080`.

3. To stop the application, press `Ctrl+C` or run the following command:

```bash
docker-compose -f docker-compose.local.yml down
```

## API docs
Read Notion docs for available APIs [here](https://svrnotes.notion.site/Codeacademy-Cats-API-docs-2d67e3ad7c2b47279d632b25e6145286?pvs=4)

## Author

- **Sachin Vedaraj** - [GitHub](https://github.com/sachinkapalidigi)

## License

This project is licensed under the ISC License.
