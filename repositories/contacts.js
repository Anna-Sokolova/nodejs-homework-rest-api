const Contact = require("../model/contactSchema");

const listContacts = async () => {
  const allContacts = await Contact.find();
  return allContacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async (body) => {
  const data = await Contact.create(body);
  return data;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, { ...body }, { new: true });
  return result;
};

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, { ...body }, { new: true });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
