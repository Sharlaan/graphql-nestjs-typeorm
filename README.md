# graphql-nestjs-Typescript-typeorm

A typescript-based backend featuring :

- NestJS framework to handle architecture, with Fastify
- TypeORM to handle Database requests
- GraphQL to handle centralized and typed requests from frontend
- Unit tests with Jest
- ParcelJS to handle bundling and HMR, alongwith typescript auto-type-checking

## Installation

### Setting up

1.  Manually create a database (without any table)
2.  Add your database credentials in `settings.ts`
3.  For each table, prepare its corresponding `XXXX.entity.ts` schema, where XXXX is the table name.

### Installing

```sh
yarn
```

## Usage

I strongly suggest using 4 terminals

```sh
yarn start // will start hot-reloading Parcel bundler
```

```sh
yarn type-check // will start Typescript watcher
```

```sh
yarn test // will start unit tests watcher
```

... and the last one in your IDE for usual commands, etc...
