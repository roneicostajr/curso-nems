module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'tasklist',
  define: {
    timestamp: true,
    underscored: true,
    undescoredAll: true,
  },
};
