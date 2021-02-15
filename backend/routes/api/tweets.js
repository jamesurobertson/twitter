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
const { Op } = require("sequelize");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const follows = await user.getFollows();
    const tweets = await Tweet.findAll({
      order: [["id", "DESC"]],
      where: {
        [Op.or]: [
          ...follows.map((follow) => ({
            userId: follow.userFollowedId,
          })),
          { userId: user.id },
        ],
      },
      include: User,
    });
    res.json({ tweets });
  })
);

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
