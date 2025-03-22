const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const triggerRouter = require("./controllers/trigger");

const middleware = require("./util/middleware");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/trigger", triggerRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
