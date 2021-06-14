const express = require("express");
const router = express.Router();
const contactCtrl = require("../../../controllers/contacts.controllers");
const { validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require("../validation");

router.get("/", contactCtrl.getAllContacts).post("/", validationCreateContact, contactCtrl.createContact);

router
  .get("/:contactId", contactCtrl.getById)
  .delete("/:contactId", contactCtrl.deleteContact)
  .put("/:contactId", validationUpdateContact, contactCtrl.update);

router.patch("/:contactId/favorite", validationUpdateStatusContact, contactCtrl.updateStatus);

module.exports = router;
