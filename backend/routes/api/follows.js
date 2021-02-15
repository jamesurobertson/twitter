const express = require("express");
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");

const { Tweet, User, Follow } = require("../../db/models");

const router = express.Router();

router.post(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const userId = parseInt(req.params.userId);
    const follow = await user.createFollow({ userFollowedId: userId });

    res.json({ follow });
  })
);

router.delete(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const userFollowedId = parseInt(req.params.userId);
    const removedFollow = await Follow.findOne({
      where: { userFollowedId, userId: user.id },
    });
    await removedFollow.destroy();
    res.json({ follow: removedFollow });
  })
);

module.exports = router;
