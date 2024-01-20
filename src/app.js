const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { ApiRouter } = require("./controllers");
const { loadDatabase } = require("./scripts/load-database");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api", ApiRouter);
app.use(express.static("static"));
loadDatabase().then(() => app.listen(process.env.PORT || 3001));
