const express = require("express");
const router = express.Router();
const userCtrl = require("../../../controllers/users.controllers");
const { schemaCreateUser } = require("./users.validation");
const guard = require("../../../helpers/guard");

router.post("/signup", schemaCreateUser, userCtrl.signupUser);
router.post("/login", schemaCreateUser, userCtrl.loginUser);
router.post("/logout", guard, userCtrl.logoutUser);
router.get("/current", guard, userCtrl.getCurrentUser);
router.patch("/subscription", guard, userCtrl.updateStatusSubscription);

module.exports = router;
