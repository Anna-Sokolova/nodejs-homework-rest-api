const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();
const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");
const UploadAvatarService = require("../services/local-upload");
const SECRET_KEY = process.env.SECRET_KEY;

// регистрируем юзера
const signupUser = async (req, res, next) => {
  try {
    const { email } = req.body;
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
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// логиним пользователя, привязываем токен
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" }); // присваивание токена пользователю
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

// Логаут пользователя
const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

// Текущий пользователь - получить данные юзера по токену
const getCurrentUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const { email, subscription } = req.user;
    return res.json({ status: "success", code: HttpCode.OK, data: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

// Обновление подписки (subscription) пользователя локально
const updateStatusSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const body = req.body;
    console.log(body);

    await Users.updateSubscription(userId, body.subscription);
    const { email, subscription } = await Users.findById(userId);

    if (!(email, subscription)) {
      return res.json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
    }

    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Обновление аватарки пользователя
const updateAvatars = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const uploads = new UploadAvatarService("avatars");
    const avatarUrl = await uploads.saveAvatar({ idUser: userId, file: req.file });
    console.log(req.user.avatarURL);

    // удаляем старую аватарку
    try {
      await fs.unlink(path.join("public", req.user.avatarURL));
    } catch (error) {
      console.log(error.message);
    }

    // обновляем аватарку
    await Users.updateAvatar(userId, avatarUrl);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateStatusSubscription,
  updateAvatars,
};
