const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");

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

// логиним пользователя
const loginUser = async (req, res, next) => {
  try {
    const allContacts = await Users.listContacts();
    return res.json({ status: "success", code: 200, data: { allContacts } });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const allContacts = await Users.listContacts();
    return res.json({ status: "success", code: 200, data: { allContacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
