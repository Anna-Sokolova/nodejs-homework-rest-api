const express = require("express");
const router = express.Router();
const userCtrl = require("../../../controllers/users.controllers");
const { schemaCreateUser, shemaUpdateSubscription } = require("./users.validation");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post("/signup", schemaCreateUser, userCtrl.signupUser);
router.post("/login", schemaCreateUser, userCtrl.loginUser);
router.post("/logout", guard, userCtrl.logoutUser);
router.get("/current", guard, userCtrl.getCurrentUser);
router.patch("/", guard, shemaUpdateSubscription, userCtrl.updateStatusSubscription);
router.patch("/avatars", guard, upload.single('avatar'), userCtrl.updateAvatars);

module.exports = router;
