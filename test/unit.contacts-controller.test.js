const { update } = require("../controllers/contacts.controllers");
const Contacts = require("../repositories/contacts");

jest.mock("../repositories/contacts");

describe("Unit test controller contacts", () => {
  const req = { user: { id: 1 }, body: {}, params: { contactId: 1 } };
  const res = {
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  //метод it или метод test - равносильны по значимости

  //проверка на успешный ответ
  it("update contact exist", async () => {
    const updatedСontact = { id: 1, name: "Anna", email: "test@com.uk" };
    Contacts.updateContact = jest.fn(() => {
      return updatedСontact;
    });
    const result = await update(req, res, next);
    console.log(result);
    expect(result).toBeDefined();
    expect(result.status).toEqual("success");
    expect(result.code).toEqual(200);
    expect(result.data.updatedСontact).toEqual(updatedСontact);
  });

  //проверка на ошибку
  it("update contact not exist", async () => {
    Contacts.updateContact = jest.fn();
    const result = await update(req, res, next);
    expect(result).toBeDefined();
    expect(result.status).toEqual("error");
    expect(result.code).toEqual(404);
    expect(result.message).toEqual("Not found");
  });

  //проверка на вызов ф-и next
  it("update contact: repositories return Error", async () => {
    Contacts.updateContact = jest.fn(() => {
      throw new Error("Ups"); //сами создаем ошибку для тестирования
    });
    await update(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
