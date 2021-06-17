const express = require("express");
const router = express.Router();

const usersRouter = require("./users/users.routes");
const contactsRouter = require("./contacts/contacts.routes");

router.use("/users", usersRouter);
router.use("/contacts", contactsRouter);

module.exports = router;
