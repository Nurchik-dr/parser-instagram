import express from "express";
import feedRoutes from "./routes/feed.route";

const app = express();
app.use(express.json());

app.use("/feed", feedRoutes);

export default app;
