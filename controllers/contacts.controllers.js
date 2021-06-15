const Contacts = require("../repositories/contacts");

// возвращает массив всех контактов
const getAllContacts = async (req, res, next) => {
  try {
    console.log(req.user);
    const allContacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { allContacts } });
  } catch (error) {
    next(error);
  }
};

// находит и возвращает контакт по id
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await Contacts.getContactById(contactId);
    if (contactById) {
      console.log(contactById);
      return res.json({ status: "success", code: 200, data: { contactById } });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

// создает новый контакт
const createContact = async (req, res, next) => {
  const body = req.body;
  try {
    const newContact = await Contacts.addContact(body);
    return res.status(201).json({ status: "success", code: 201, data: { newContact } });
  } catch (error) {
    next(error);
  }
};

// удаляет контакт по id
const deleteContact = async (req, res, next) => {
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
};

// обновляет контакт по id
const update = async (req, res, next) => {
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
};

// обновляет статус контакта по id
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
    const updatedСontact = await Contacts.updateStatusContact(contactId, body);
    if (!updatedСontact) {
      return res.json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ status: "success", code: 200, data: { updatedСontact } });
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
