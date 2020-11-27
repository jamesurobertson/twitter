const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.get("/hello/world", (req, res) => {
  res.cookie("CSRF-TOKEN", req.csrfToken());
  res.send("Hello World!");
});

router.use("/api", apiRouter);
module.exports = router;
