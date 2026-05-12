export default () => ({
  app: {
    name: process.env.APP_NAME,
    version: '1.0.0',
    adminEmail: 'admin@example.com',
  },

  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',

    port: Number(
      process.env.POSTGRES_PORT || 5432,
    ),

    username:
      process.env.POSTGRES_USER || 'admin',

    password:
      process.env.POSTGRES_PASSWORD || '12345',

    database:
      process.env.POSTGRES_DB || 'testdb',
  },

  mongodb: {
    uri:
      process.env.MONGO_URI ||
      'mongodb://localhost:27017/demoProjectNestjs',
  },

  websocket: {
    token: process.env.WS_TOKEN,

    corsOrigin: '*',
  },

  chat: {
    bannedRooms:
      process.env.BANNED_ROOMS?.split(',') || [],
  },

  features: {
    loadAdmin:
      process.env.LOAD_ADMIN === 'true',
  },
});