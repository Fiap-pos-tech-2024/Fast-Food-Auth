const registerUserUseCase = require("../../usecases/RegisterUserUseCase");
const loginUserUseCase = require("../../usecases/LoginUserUseCase");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

class UserController {
  async register(event) {
    const body = JSON.parse(event.body);
    const { cpf, password } = body;
    try {
      const user = await registerUserUseCase.execute({ cpf, password });
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "Usuário registrado com sucesso",
          user,
        }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  async login(event) {
    const body = JSON.parse(event.body);
    const { cpf, password } = body;
    try {
      const { token } = await loginUserUseCase.execute({ cpf, password });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Login realizado com sucesso",
          token,
        }),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  async verifyToken(event) {
    const token = event.headers.Authorization;
    try {
      const decoded = jwt.verify(
        token,
        authConfig.secretOrPrivateKey || "your-secret-key"
      );
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Token válido",
          decoded,
        }),
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Token inválido" }),
      };
    }
  }
}

module.exports = new UserController();
