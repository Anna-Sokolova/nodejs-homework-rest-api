const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("./constants");
require("colors");

// мидлвара Guard создает и проверяет jwt токены
const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const headerAuth = req.get("Authorization");
    console.log(headerAuth.blue); // консолим токен юзера
    let token = null;
    if (headerAuth) {
      token = headerAuth.split(" ")[1];
    }

    if (err || !user || token !== user?.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    req.user = user; // хешируем юзера
    return next();
  })(req, res, next);
};

module.exports = guard;
