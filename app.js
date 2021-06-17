const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const boolParser = require("express-query-boolean");
const { limiterAPI } = require("./helpers/constants");
const { HttpCode } = require("./helpers/constants");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet()); // подключаем перед всеми ПО для безопасности
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

// устанавливаем лимит запросов на наш сервер
app.use("/api/", rateLimit(limiterAPI));

// подключаем файл роутера
app.use("/api/", require("./routes/api"));

app.use((_req, res) => {
  res.status(404).json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res.status(status).json({ status: "fail", code: status, message: err.message });
});

module.exports = app;
