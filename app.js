const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { limiterAPI } = require("./helpers/constants");

const usersRouter = require("./routes/api/users/users.routes");
const contactsRouter = require("./routes/api/contacts/contacts.routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet()); // подключаем перед всеми ПО для безопасности
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

// устанавливаем лимит запросов на наш сервер
app.use("/api/", rateLimit(limiterAPI));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ status: "fail", code: status, message: err.message });
});

module.exports = app;
