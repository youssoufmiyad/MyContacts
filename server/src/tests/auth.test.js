import request from "supertest";
import { jest } from "@jest/globals";

// Mock du modèle User
const mockFindOne = jest.fn();
const mockFindById = jest.fn();
const mockSave = jest.fn();

const UserMock = jest.fn().mockImplementation(() => ({
  save: mockSave,
}));
UserMock.findOne = mockFindOne;
UserMock.findById = mockFindById;

jest.unstable_mockModule("../models/User.js", () => ({
  __esModule: true,
  default: UserMock,
}));

// Mock bcrypt
jest.unstable_mockModule("bcrypt", () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

// Mock jsonwebtoken
jest.unstable_mockModule("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
    verify: jest.fn(),
  },
}));

const bcryptMock = (await import("bcrypt")).default;
const jwtMock = (await import("jsonwebtoken")).default;
const User = (await import("../models/User.js")).default;
const { app } = await import("../index.js");

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

describe("🧪 Tests de l'API /mycontacts/auth", () => {
  // ----------------------------
  // ✅ TEST REGISTER (signup)
  // ----------------------------
  test("POST /mycontacts/auth/signup → crée un utilisateur", async () => {
    User.findOne.mockResolvedValue(null); // contourne le test de mail unique
    bcryptMock.hash.mockResolvedValue("hashedPassword");
    mockSave.mockResolvedValue({ _id: "123", email: "test@example.com" });

    const res = await request(app)
      .post("/mycontacts/auth/signup")
      .send({ email: "test@example.com", password: "Password@123" });

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcryptMock.hash).toHaveBeenCalledWith("Password@123", 10);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  test("POST /mycontacts/auth/signup → renvoie 400 si email déjà utilisé", async () => {
    User.findOne.mockResolvedValue({ _id: "abc", email: "test@example.com" });

    const res = await request(app)
      .post("/mycontacts/auth/signup")
      .send({ email: "test@example.com", password: "Password@123" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email adress already used");
  });

  test("POST /mycontacts/auth/signup → renvoie 400 si email invalide", async () => {
    User.findOne.mockResolvedValue(null);
    const res = await request(app)
      .post("/mycontacts/auth/signup")
      .send({ email: "not-an-email", password: "Password@123" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email format");
  });

  test("POST /mycontacts/auth/signup → renvoie 400 si mot de passe faible", async () => {
    User.findOne.mockResolvedValue(null);
    const res = await request(app)
      .post("/mycontacts/auth/signup")
      .send({ email: "test@example.com", password: "weak" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
    );
  });

  // ----------------------------
  // ✅ TEST LOGIN
  // ----------------------------
  test("POST /mycontacts/auth/login → connecte un utilisateur", async () => {
    const fakeUser = {
      _id: "123",
      email: "test@example.com",
      password: "hashedPwd",
    };

    User.findOne.mockResolvedValue(fakeUser);
    bcryptMock.compare.mockResolvedValue(true);
    jwtMock.sign.mockReturnValue("fake-jwt-token");

    const res = await request(app).post("/mycontacts/auth/login").send({
      email: "test@example.com",
      password: "Password@123",
      remember: false,
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe("fake-jwt-token");
    expect(res.body.user.email).toBe("test@example.com");
  });

  test("POST /mycontacts/auth/login → renvoie 400 si mauvais mot de passe", async () => {
    const fakeUser = {
      _id: "123",
      email: "test@example.com",
      password: "hashedPwd",
    };

    User.findOne.mockResolvedValue(fakeUser);
    bcryptMock.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/mycontacts/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });

  // ----------------------------
  // ✅ TEST EMAIL-TAKEN
  // ----------------------------
  test("POST /mycontacts/auth/email-taken → retourne taken: true si email existe", async () => {
    User.findOne.mockResolvedValue({ _id: "123", email: "test@example.com" });

    const res = await request(app)
      .post("/mycontacts/auth/email-taken")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.taken).toBe(true);
  });

  test("POST /mycontacts/auth/email-taken → retourne taken: false si email libre", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/mycontacts/auth/email-taken")
      .send({ email: "new@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.taken).toBe(false);
  });
  // ----------------------------
  // ✅ TEST GET CURRENT USER
  // ----------------------------
  // test("GET /mycontacts/auth/me → retourne les infos de l'utilisateur connecté", async () => {
  //   User.findOne.mockResolvedValue({ _id: "123", email: "test@example.com" });

  //   const fakeUser = { _id: "123", email: "test@example.com" };
  //   jwtMock.verify.mockReturnValue(fakeUser);

  //   const res = await request(app)
  //     .get("/mycontacts/auth/me")
  //     .set("Authorization", "Bearer fake-jwt-token");

  //   expect(res.status).toBe(200);
  //   expect(res.body.email).toBe("test@example.com");
  // });
  test("GET /mycontacts/auth/me → renvoie 401 si token invalide", async () => {
    jwtMock.verify.mockImplementation(() => {
      throw new Error("Unauthorized");
    });

    const res = await request(app)
      .get("/mycontacts/auth/me")
      .set("Authorization", "Bearer fake-jwt-token");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });
  test("GET /mycontacts/auth/me → renvoie 401 si token manquant", async () => {
    const res = await request(app).get("/mycontacts/auth/me");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  // test("GET /mycontacts/auth/me → renvoie 404 si utilisateur non trouvé", async () => {
  //   const fakeUser = { id: "123" };
  //   jwtMock.verify.mockReturnValue(fakeUser);
  //   User.findById.mockResolvedValue(null);

  //   const res = await request(app)
  //     .get("/mycontacts/auth/me")
  //     .set("Authorization", "Bearer fake-jwt-token");

  //   expect(res.status).toBe(404);
  //   expect(res.body.message).toBe("User not found");
  // });
});
