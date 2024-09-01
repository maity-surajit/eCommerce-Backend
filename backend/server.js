const app = require("./app");
const dotenv = require("dotenv");
const { connectDatabase } = require("./config/database"); 

dotenv.config({ path: "backend/config/config.env" });

console.log("Database URI:", process.env.DB_URI);
console.log("Server Port:", process.env.PORT);

// Connect to database and start server
connectDatabase()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
