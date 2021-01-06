const express = require("express");
const asyncHandler = require("express-async-handler");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Please provide a username with at least 3 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    setTokenCookie(res, user);

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

module.exports = router;
