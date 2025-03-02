## Technologies Used

- **Express.js:** A minimal and flexible Node.js web framework that simplifies building APIs and web applications with middleware support.

- **TypeScript:** A statically typed superset of JavaScript that enhances code quality, maintainability, and developer experience.

- **JWT:** A compact, URL-safe token format used for securely transmitting authentication and authorization data between parties.

- **GraphQL:** A query language and runtime for APIs that allows clients to request only the data they need, improving efficiency and flexibility in data fetching.

- **Apollo:** A GraphQL implementation that provides client and server tools for building scalable, real-time applications with advanced caching, state management, and schema stitching.

- **Prisma:** A next-generation ORM that simplifies database access with an auto-generated query builder for TypeScript and Node.js.

## Installation & Configuration

### Backend

Install npm packages and get the Prisma schema with entities.

```bash
$ npm install
```

Fill up the `.env` file.

```bash
JWT_SECRET=
DATABASE_URL=
PORT=3333
```

Migrate prisma schema to your database and run app.

```bash
$ npm run prisma:migrate
$ npm run dev
```

### Frontend

Install npm packages and get the Prisma schema with entities.

```bash
$ npm install
```

Fill up the `.env` file.

```bash
# your local backend server
VITE_GRAPHQL_URL=
```

Run app.

```bash
$ npm run dev
```
