import express from "express";
const app = express();
import triggerRouter from "./routes/triggers";
import cors from "cors";

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/triggers", triggerRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
