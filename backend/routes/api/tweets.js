const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Tweet, User, Sequelize } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll({
      include: { all: true, nested: true },
    });
    res.json({ tweets });
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const tweet = await user.createTweet(
      { ...req.body }
      //   { include: [{ association: User }] }
    );

    res.json({ tweet });
  })
);

module.exports = router;
