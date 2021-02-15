// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const tweetsRouter = require("./tweets.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/tweets", tweetsRouter);

module.exports = router;
