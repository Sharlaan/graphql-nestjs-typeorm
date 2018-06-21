const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_DB_NAME,
  POSTGRES_USER_NAME,
  POSTGRES_PASSWORD,
} = process.env;

export const main = {
  port: PORT || 8080,
  subscriptionsPort: typeof PORT === "number" ? PORT + 1 : 8081,
};

export const db = {
  type: "postgres",
  host: POSTGRES_HOST || "localhost",
  port: 5432,
  database: POSTGRES_DB_NAME || "nest-graph",
  username: POSTGRES_USER_NAME || "postgres",
  password: POSTGRES_PASSWORD || "postgres",
  entities: ["src/**/**.entity{.ts,.js}"],
  logging: true,
  synchronize: true,
};

// Auth
export const auth = {
  jwt: {
    secret: "",
  },
  google: {
    client_id: ".apps.googleusercontent.com",
    client_secret: "",
    redirect_uri: "http://localhost:8080/",
  },
};

// Other settings here
