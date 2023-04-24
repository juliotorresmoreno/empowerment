function getConfig() {
  const env = ['development', 'production'].includes(process.env.NODE_ENV)
    ? (process.env.NODE_ENV as any)
    : 'development';
  return {
    env: env,
    port: Number.parseInt(process.env.PORT) || 5000,
    secret: process.env.SECRET,
    baseUrl: process.env.BASE_URL,
    database: {
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: false,
      entities: ['src/entity/**/*.ts'],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
    },
  };
}

const configuration = [getConfig];

export default configuration;
