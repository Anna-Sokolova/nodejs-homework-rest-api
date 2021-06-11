const app = require("../app");
require("dotenv").config();
const db = require("../model/db");
const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => console.log(`Error: ${error.message}`));
