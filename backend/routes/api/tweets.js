const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Tweet, User, Like } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

// Feed tweets, based off users you follow.
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const follows = await user.getFollows();
    const tweets = await Tweet.findAll({
      order: [["id", "DESC"]],
      limit: 10,
      where: {
        [Op.or]: [
          ...follows.map((follow) => ({
            userId: follow.userFollowedId,
          })),
          { userId: user.id },
        ],
      },
      include: [User, "likes"],
    });
    res.json({ tweets });
  })
);

// Last 10 tweets of an individual user
router.get(
  "/:username",
  asyncHandler(async (req, res, next) => {
    const username = req.params.username;
    const user = await User.findOne({ where: { username } });
    const tweets = await Tweet.findAll({
      order: [["id", "DESC"]],
      limit: 10,
      where: { userId: user.id },
      include: User,
    });

    res.json({ tweets });
  })
);

// posting a tweet
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const tweet = await user.createTweet({ ...req.body });
    await tweet.reload({ include: User });
    res.json({ tweet });
  })
);

module.exports = router;
