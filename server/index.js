import express from "express";
import AuthController from "./auth/AuthController.js";

const app = express();

app.listen(5001, () => {
  console.log("Express server listening on port " + 5001);
});

app.use("/auth", AuthController);
