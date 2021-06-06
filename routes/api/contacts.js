const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const { validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require("./validation");

// возвращает массив всех контактов
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { allContacts } });
  } catch (error) {
    next(error);
  }
});

// находит и возвращает контакт по id
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await Contacts.getContactById(contactId);
    if (!contactById) {
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ status: "success", code: 200, data: { contactById } });
  } catch (error) {
    next(error);
  }
});

// создает новый контакт
router.post("/", validationCreateContact, async (req, res, next) => {
  const body = req.body;
  try {
    const newContact = await Contacts.addContact(body);
    return res.status(201).json({ status: "success", code: 201, data: { newContact } });
  } catch (error) {
    next(error);
  }
});

// удаляет контакт по id
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const remoteСontact = await Contacts.removeContact(contactId);
    if (!remoteСontact) {
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
    res.status(200).json({ status: "success", code: 200, message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

// обновляет контакт по id
router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    const updatedСontact = await Contacts.updateContact(contactId, body);
    if (!updatedСontact) {
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ status: "success", code: 200, data: { updatedСontact } });
  } catch (error) {
    next(error);
  }
});

// обновляет статус контакта по id
router.patch("/:contactId/status", validationUpdateStatusContact, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    const updatedСontact = await Contacts.updateContact(contactId, body);
    if (!updatedСontact) {
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ status: "success", code: 200, data: { updatedСontact } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
