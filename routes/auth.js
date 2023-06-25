const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth");

module.exports = function(server) {
  server.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  server.post(
    "/api/signup",
    [
      verifySignUp.duplicateCheck
    ],
    controller.signup
  );

  server.post("/api/signin", controller.signin);
};