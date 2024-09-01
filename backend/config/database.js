const mongoose = require("mongoose");

const connectDatabase = async function connectDatabase() {
  await mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`mongodb is connected with: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`database connection failed: `, err);
    });
};

module.exports = {
  connectDatabase,
};