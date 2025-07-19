const express = require("express");
const swagmanUI = require("./src/index");

const app = express();

app.use("/api-docs", swagmanUI.serve, swagmanUI.setup({
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
}, { title: "My API Docs" }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
