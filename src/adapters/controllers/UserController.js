const registerUserUseCase = require("../../usecases/RegisterUserUseCase");
const loginUserUseCase = require("../../usecases/LoginUserUseCase");

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
      const user = await loginUserUseCase.execute({ cpf, password });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Login realizado com sucesso",
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
}

module.exports = new UserController();
