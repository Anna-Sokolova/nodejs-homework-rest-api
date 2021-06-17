const express = require("express");
const router = express.Router();
const contactCtrl = require("../../../controllers/contacts.controllers");
const guard = require("../../../helpers/guard");
const { validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require("./contacts.validation");

router.get("/", guard, contactCtrl.getAllContacts).post("/", guard, validationCreateContact, contactCtrl.createContact);

router
  .get("/:contactId", guard, contactCtrl.getById)
  .delete("/:contactId", guard, contactCtrl.deleteContact)
  .put("/:contactId", guard, validationUpdateContact, contactCtrl.update);

router.patch("/:contactId/favorite", guard, validationUpdateStatusContact, contactCtrl.updateStatus);

module.exports = router;
