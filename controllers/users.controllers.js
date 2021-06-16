const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");

const SECRET_KEY = process.env.SECRET_KEY;

// регистрируем юзера
const signupUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const newUser = await Users.create(req.body);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// логиним пользователя, привязываем токен
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(user.id, token);

    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
