const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Follow, Tweet } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");
const { Op } = require("sequelize");

const router = express.Router();

const validateSignup = [
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("username")
    .isLength({ min: 3 })
    .withMessage("Please provide a username with at least 3 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({
      email,
      username,
      password,
      profileImageUrl: "google.com",
      bannerImageUrl: "google.com",
    });

    setTokenCookie(res, user);

    await user.reload({ include: "follows" });
    return res.json({
      user,
    });
  })
);
router.post(
  "/uploadTest",
  singleMulterUpload("img"),
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const location = await singlePublicFileUpload(req.file);
    await User.update(
      {
        bio: location,
      },
      { where: { id: 1 } }
    );

    res.sendStatus(200).end();
  })
);

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [
        "followers",
        "follows",
        {
          model: Tweet,
          as: "tweets",
          limit: 10,
          order: [["id", "DESC"]],
          include: "likes",
        },
      ],
    });

    res.json({ user });
  })
);

router.get(
  "/search/:queryStr",
  asyncHandler(async (req, res) => {
    const query = req.params.queryStr;
    const users = await User.findAll({
      where: { username: { [Op.iLike]: `${query}%` } },
      limit: 10,
    });
    console.log(users.length);
    res.json(users);
  })
);

module.exports = router;
