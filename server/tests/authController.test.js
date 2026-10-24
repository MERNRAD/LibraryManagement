
jest.mock("../models/user", () => jest.fn());

jest.mock("passport", () => ({
  authenticate: jest.fn()
}));

const User = require("../models/user");
const passport = require("passport");

const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");

const createResponse = () => {
  const res = {
    status: jest.fn(),
    json: jest.fn()
  };

  res.status.mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Pruebas unitarias del controlador de autenticacion", () => {

  test("TA-01: inicia sesion con credenciales correctas", () => {
    const user = {
      isValidPassword: jest.fn().mockReturnValue(true)
    };

    User.findOne = jest.fn((query, callback) => {
      callback(null, user);
    });

    passport.authenticate.mockImplementation(
      (strategy, callback) => (req, res, next) => {
        callback(null, user, null);
      }
    );

    const req = {
      body: {
        email: "test@example.com",
        password: "CorrectPassword123"
      },
      logIn: jest.fn((user, callback) => callback(null))
    };

    const res = createResponse();

    loginUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user
    });
  });

  test("TA-02: rechaza una contrasena incorrecta", () => {
    const user = {
      isValidPassword: jest.fn().mockReturnValue(false)
    };

    User.findOne = jest.fn((query, callback) => {
      callback(null, user);
    });

    const req = {
      body: {
        email: "test@example.com",
        password: "WrongPassword"
      }
    };

    const res = createResponse();

    loginUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Password incorrect"
    });
  });

  test("TA-03: rechaza el acceso si el usuario no existe", () => {
    User.findOne = jest.fn((query, callback) => {
      callback(null, null);
    });

    const req = {
      body: {
        email: "unknown@example.com",
        password: "Password123"
      }
    };

    const res = createResponse();

    loginUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found"
    });
  });

  test("TA-04: impide registrar un usuario existente", () => {
    User.findOne = jest.fn((query, callback) => {
      callback(null, { email: "test@example.com" });
    });

    const req = {
      body: {
        email: "test@example.com",
        password: "Password123"
      }
    };

    const res = createResponse();

    registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User already exists"
    });
  });

  test("TA-05: registra un usuario nuevo", () => {
    const savedUser = {
      email: "new@example.com"
    };

    User.findOne = jest.fn((query, callback) => {
      callback(null, null);
    });

    User.mockImplementation(() => ({
      setPassword: jest.fn(),
      save: jest.fn(callback => callback(null, savedUser))
    }));

    const req = {
      body: {
        email: "new@example.com",
        password: "Password123"
      }
    };

    const res = createResponse();

    registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: savedUser
    });
  });

  test("TA-06: cierra la sesion correctamente", () => {
    const req = {
      logout: jest.fn(callback => callback(null))
    };

    const res = createResponse();
    const next = jest.fn();

    logoutUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User logged out"
    });
  });

  test("TA-07: propaga el error al cerrar la sesion", () => {
    const error = new Error("Logout failed");

    const req = {
      logout: jest.fn(callback => callback(error))
    };

    const res = createResponse();
    const next = jest.fn();

    logoutUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test("TA-08: maneja un error al buscar un usuario", () => {
    const error = new Error("Database error");

    User.findOne = jest.fn((query, callback) => {
      callback(error, null);
    });

    const req = {
      body: {
        email: "test@example.com",
        password: "Password123"
      }
    };

    const res = createResponse();

    loginUser(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
          success: false,
          err: error
      });
  });
});
