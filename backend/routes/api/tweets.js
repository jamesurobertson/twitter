const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Tweet, User, Like, Mention, Hashtag } = require("../../db/models");
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
      include: ["likes"],
    });
    const users = await Promise.all(
      [...new Set(tweets.map((tweet) => tweet.userId))].map((userId) =>
        User.findByPk(userId, { include: ["follows", "followers"] })
      )
    );
    res.json({ tweets, users });
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
    const { content, mentions, hashes } = req.body;
    const tweet = await user.createTweet({ content });
    await tweet.reload({ include: "likes" });

    // create all Mentions from the tweet
    await Promise.all(
      mentions.map((mention) =>
        Mention.create({
          userIdMentioned: mention.user.id,
          medium: "tweet",
          mediumId: tweet.id,
        })
      )
    );

    // create all Hashtags from the tweet
    await Promise.all(
      hashes.map((hash) => {
        Hashtag.create({ ...hash, mediumId: tweet.id });
      })
    );

    res.json({ tweet, user });
  })
);

//posting a like
router.post(
  "/like/:tweetId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const tweetId = parseInt(req.params.tweetId);
    const like = await user.createLike({ tweetId });
    res.json({ like });
  })
);

//removing a like tweet
router.delete(
  "/like/:tweetId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const tweetId = parseInt(req.params.tweetId);
    // can I find a way to do user.removeLike({...}) ?
    const like = await Like.findOne({ where: { tweetId, userId: user.id } });
    await like.destroy();
    res.json({ like });
  })
);
module.exports = router;
