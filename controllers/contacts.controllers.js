const Contacts = require("../repositories/contacts");
const { HttpCode } = require("../helpers/constants");

// возвращает массив всех контактов
const getAllContacts = async (req, res, next) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const allContacts = await Contacts.listContacts(userId);
    return res.json({ status: "success", code: HttpCode.OK, data: { allContacts } });
  } catch (error) {
    next(error);
  }
};

// находит и возвращает контакт по id
const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;
    const contactById = await Contacts.getContactById(userId, contactId);
    if (contactById) {
      console.log(contactById);
      return res.json({ status: "success", code: HttpCode.OK, data: { contactById } });
    }
    return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

// создает новый контакт
const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const body = req.body;
    const newContact = await Contacts.addContact(userId, body);
    return res.status(201).json({ status: "success", code: HttpCode.CREATED, data: { newContact } });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    next(error);
  }
};

// удаляет контакт по id
const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;
    const remoteСontact = await Contacts.removeContact(userId, contactId);
    if (!remoteСontact) {
      return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
    }
    res.status(200).json({ status: "success", code: HttpCode.OK, message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

// обновляет контакт по id
const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;
    const body = req.body;
    const updatedСontact = await Contacts.updateContact(userId, contactId, body);
    if (!updatedСontact) {
      return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
    }
    return res.json({ status: "success", code: HttpCode.OK, data: { updatedСontact } });
  } catch (error) {
    next(error);
  }
};

// обновляет статус контакта по id
const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contactId } = req.params;
    const body = req.body;
    const updatedСontact = await Contacts.updateStatusContact(userId, contactId, body);
    if (!updatedСontact) {
      return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
    }
    return res.json({ status: "success", code: HttpCode.OK, data: { updatedСontact } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  update,
  updateStatus,
};
