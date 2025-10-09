import { jest, describe, test, expect, afterAll, beforeEach } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";

// Mock Mongoose
jest.unstable_mockModule("mongoose", () => ({
  default: {
    connect: jest.fn(),
    connection: { on: jest.fn(), once: jest.fn() },
    disconnect: jest.fn(),
    Schema: class {},
    model: jest.fn(() => ({})),
  },
}));

// Mock Contact
jest.unstable_mockModule("../models/Contact.js", () => {
  const mockSave = jest.fn();

  const MockContact = jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));

  MockContact.find = jest.fn();
  MockContact.findOne = jest.fn();
  MockContact.findById = jest.fn();
  MockContact.findByIdAndUpdate = jest.fn();
  MockContact.findByIdAndDelete = jest.fn();
  MockContact.countDocuments = jest.fn();

  return { default: MockContact };
});

// Mock middleware JWT
jest.unstable_mockModule("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    verify: jest.fn().mockReturnValue({ id: "123" }),
  },
}));

const { default: Contact } = await import("../models/Contact.js");
const { app } = await import("../index.js");
const jwtMock = (await import("jsonwebtoken")).default;

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

describe("🧪 Tests de l'API /mycontacts/contacts", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("GET /mycontacts/contacts → retourne une liste de contacts", async () => {
    const fakeContacts = [
      { _id: "1", firstName: "John", lastName: "Doe", email: "john@doe.com" },
    ];

    const mockQuery = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(fakeContacts),
    };

    Contact.find.mockReturnValue(mockQuery);
    Contact.countDocuments.mockResolvedValue(1);

    const res = await request(app)
      .get("/mycontacts/contacts")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(jwtMock.verify).toHaveBeenCalledWith("fake-jwt-token", "test-secret");
    expect(res.status).toBe(200);
    expect(res.body.contacts).toHaveLength(1);
    expect(res.body.contacts[0].firstName).toBe("John");
  });

  test("GET /mycontacts/contacts/id/:id → retourne un contact par ID", async () => {
    Contact.findById.mockResolvedValue({
      _id: "123",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@smith.com",
    });

    const res = await request(app)
      .get("/mycontacts/contacts/id/123")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("alice@smith.com");
  });

  test("GET /mycontacts/contacts/:slug → retourne un contact par slug", async () => {
    Contact.findOne.mockResolvedValue({
      _id: "456",
      firstName: "Bob",
      lastName: "Brown",
      email: "bob@brown.com",
      slug: "bob-brown",
    });

    const res = await request(app)
      .get("/mycontacts/contacts/bob-brown")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("bob@brown.com");
  });

  test("GET /mycontacts/contacts/:slug → renvoie 404 si contact non trouvé", async () => {
    Contact.findOne.mockResolvedValue(null);
    const res = await request(app)
      .get("/mycontacts/contacts/non-existent-slug")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Contact not found");
  });

  test("GET /mycontacts/contacts/search → recherche des contacts", async () => {
    const fakeContacts = [
      { _id: "1", firstName: "John", lastName: "Doe", email: "john@doe.com" },
      { _id: "2", firstName: "Jane", lastName: "Doe", email: "jane@doe.com" },
      { _id: "3", firstName: "Bob", lastName: "Brown", email: "bob@brown.com" },
    ];
    Contact.find.mockResolvedValue(fakeContacts);

    const res = await request(app)
      .get("/mycontacts/contacts/search")
      .query({ query: "Bob" })
      .set("Authorization", "Bearer fake-jwt-token");

    expect(res.status).toBe(200);
    expect(res.body.contacts).toHaveLength(1);
    // expect(res.body.contacts[0].firstName).toBe("John");
    // expect(res.body.contacts[1].firstName).toBe("Jane");
  });

  test("PATCH /mycontacts/contacts/:id → met à jour un contact", async () => {
    Contact.findByIdAndUpdate.mockResolvedValue({
      _id: "123",
      firstName: "Not yet updated",
      lastName: "User",
      email: "toupdate.user@example.com",
    });
    const res = await request(app)
      .patch("/mycontacts/contacts/123")
      .set("Authorization", "Bearer fake-jwt-token")
      .send({ firstName: "Updated", email: "updated.user@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("Updated");
    expect(res.body.email).toBe("updated.user@example.com");
  });

  test("POST /mycontacts/contacts → crée un contact", async () => {
    Contact.findOne.mockResolvedValue(null);

    const mockSave = jest.fn().mockResolvedValue({
      _id: "999",
      firstName: "Bob",
      lastName: "Marley",
      email: "bob@marley.com",
      slug: "bob-marley",
    });

    Contact.mockImplementation(() => ({
      save: mockSave,
    }));

    const res = await request(app)
      .post("/mycontacts/contacts")
      .set("Authorization", "Bearer fake-jwt-token")
      .send({
        firstName: "Bob",
        lastName: "Marley",
        phone: "0600000000",
        email: "bob@marley.com",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/Contact created successfully/);
    expect(mockSave).toHaveBeenCalled();
  });
  test("DELETE /mycontacts/contacts/:id → supprime un contact", async () => {
    Contact.findByIdAndDelete.mockResolvedValue({
      _id: "123",
      firstName: "ToDelete",
      lastName: "User",
      email: "todelete.user@example.com",
    });
    const res = await request(app)
      .delete("/mycontacts/contacts/123")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact deleted successfully");
  });
});
