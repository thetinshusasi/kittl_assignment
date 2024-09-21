import express from "express";
import path from "path";
import rootRouter from "./routes";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, ".")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", rootRouter)
app.use((req, res) => {
  console.error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(400).send("Bad Request: Route not found");
});

app.listen(777, async () => {
  console.log("Listening to port 777");
});
