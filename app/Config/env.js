const env = {
  database: "umg_antigua16411",
  username: "umg_antigua16411_user",
  password: "rNaXVVHhcRhefHJLLE2n7VyptlKMTZty",
  host: "dpg-cr6jvsdds78s73buvp00-a.oregon-postgres.render.com",
  dialect: "postgres",
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
};

module.exports = env;

