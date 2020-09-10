import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/sign-in", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;

  if (password === "1234") {
    const accessToken = jwt.sign({ id: username }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    const refreshToken = jwt.sign(
      { id: username },
      config.REFRESH_TOKEN_SECRET,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * 60 * 60 * 24;

    return res.status(200).send({
      auth: true,
      access: { token: accessToken, expires: expireTime },
      refresh: { token: refreshToken, expires: expireTime },
    });
  }
  res.status(403).send({ auth: false, massage: "Not valid password" });
});

router.post("/refresh-token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: 86400, // expires in 24 hours
    });
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * 60 * 60 * 24;
    res.json({ access: { token: accessToken, expires: expireTime } });
  });
});

router.delete("/logout", (_, res) => {
  res.status(240).send({ auth: false, massage: "Logout was successfully" });
});

export default router;
