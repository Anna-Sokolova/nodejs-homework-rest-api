const express = require("express");
const router = express.Router();
const userCtrl = require("../../../controllers/users.controllers");
// const { validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require("../validation");

router.post("/signup",  userCtrl.signupUser);
router.post("/login",  userCtrl.loginUser);
router.post("/logout",  userCtrl.logoutUser);

module.exports = router;
