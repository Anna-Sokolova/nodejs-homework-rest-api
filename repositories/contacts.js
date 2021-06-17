const Contact = require("../model/contactSchema");

const listContacts = async (userId, query) => {
  // const allContacts = await Contact.find({ owner: userId }).populate({
  //   path: 'owner',
  //   select: 'email subscription -_id'
  // });
  const { sortBy, sortByDesc, filter, isFavorite = null, limit = 5, page = 1 } = query;
  const optionSearch = { owner: userId };
  if (isFavorite !== null) {
    optionSearch.isFavorite = favorite;
  }
  const allContacts = await Contact.paginate(optionSearch, { limit, page });
  return allContacts;
};

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: "owner",
    select: "email subscription",
  });
  return contact;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
  return result;
};

const addContact = async (userId, body) => {
  const data = await Contact.create({ owner: userId, ...body });
  return data;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, { ...body }, { new: true });
  return result;
};

const updateStatusContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, { ...body }, { new: true });
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
