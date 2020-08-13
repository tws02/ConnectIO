const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route  : POST api/users
// @desc   : register user
// @access : Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with at least 8 characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exists, if yes, send error as taken
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({
          errors: [
            { msg: "This email has an existing account. Please log in." }
          ]
        });
      }

      // Grab users gravatar
      const avatar = gravatar.url(email, {
        // size
        s: "200",

        // rating pg or no
        r: "pg",

        // default
        d: "mm"
      });

      user = new User({
        name,
        email,
        password,
        avatar
      });

      // Encrypt using Bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return json Web Token
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
