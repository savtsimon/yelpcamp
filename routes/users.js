const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    catchAsync(users.login)
  );

router.get("/logout", users.logout);

module.exports = router;
