//configure database.
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "db_password",
    DB: "note_manager_db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
