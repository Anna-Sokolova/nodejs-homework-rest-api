const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = require("../app");
const db = require("../model/db");
const User = require("../model/userSchema");
const Contact = require('../model/contactSchema')
const Users = require('../repositories/users')
const { newContact, newUser } = require('./data/data')

describe("Test route contacts", () => {
  let user, token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUser.email });
    user = await User.create(newUser);
    const SECRET_KEY = process.env.SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await Users.updateToken(user._id, token);
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUser.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
  });

  describe("GET request", () => {
    //тестируем функцию getAllContacts из contacts.controllers
    it("should return status 200 get all contacts", async () => {
      const response = await request(app).get("/api/contacts").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.allContacts).toBeInstanceOf(Array);
    });

    //тестируем функцию getById из contacts.controllers
    it("should return status 200 get contact by id", async () => {
      const contactById = await Contact.create({ ...newContact, owner: user._id });
      const response = await request(app).get(`/api/contacts/${contactById._id}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.contactById).toHaveProperty("id");
      expect(response.body.data.contactById.id).toBe(String(contactById._id));
    });

    //тестируем функцию getById из contacts.controllers на ошибку
    it("should return status 404 get contact without id", async () => {
      const fakeId = "60ad371ee5c5131384447a75";
      const response = await request(app).get(`/api/contacts/${fakeId}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(404);
      expect(response.body).toBeDefined();
    });
  });

  //тестируем функцию createContact из contacts.controllers
  describe("POST request", () => {
    it("should return status 201 create contact", async () => {
      const response = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send(newContact)
        .set("Accept", "application/json");

      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
    });
  });
});
