export default {
  host: {
    address: process.env.HOST_ADDRESS || '0.0.0.0',
    port: process.env.HOST_PORT || 8000
  },
  db: {
    user: 'qwirk',
    host: '127.0.0.1',
    database: 'qwirk',
    password: 'qwirk',
    port: 5432,
  },
  jwt: {
    token: process.env.JWT_TOKEN || '99419e462daeb767622023e9b6ac8c20343141f1'
  }
}
