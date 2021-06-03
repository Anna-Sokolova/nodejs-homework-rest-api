const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const pathToContacts = path.join(__dirname, "contacts.json");
// console.log("pathToContacts ", pathToContacts)

const readData = async () => {
  const response = await fs.readFile(pathToContacts, "utf8");
  const data = JSON.parse(response);
  return data;
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const data = await readData();
  const contact = data.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await readData();

  const contactIdx = data.findIndex((contact) => contact.id === contactId);
  const remoteContact = data.splice(contactIdx, 1);

  await fs.writeFile(pathToContacts, JSON.stringify(data, null, 2), "utf8");
  return remoteContact;
};

const addContact = async (body) => {
  const id = nanoid(10);
  const record = {
    id,
    ...body,
  };
  const data = await readData();
  data.push(record);

  fs.writeFile(pathToContacts, JSON.stringify(data, null, 2), "utf8");

  return record;
};

const updateContact = async (contactId, body) => {
  const data = await readData();
  const [contact] = data.filter((contact) => contact.id === contactId);
  if (contact) {
    Object.assign(contact, body);
    fs.writeFile(pathToContacts, JSON.stringify(data, null, 2), "utf8");
  }

  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
