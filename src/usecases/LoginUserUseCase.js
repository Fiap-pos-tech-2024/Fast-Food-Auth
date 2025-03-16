const userRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

class LoginUserUseCase {
  async execute({ cpf, password }) {
    const user = await userRepository.findByCpf(cpf);
    if (!user || user.password !== password) {
      throw new Error("CPF ou senha inválidos");
    }
    const token = jwt.sign({ cpf: user.cpf }, authConfig.secretOrPrivateKey, {
      expiresIn: "1h",
    });
    return { user, token };
  }
}

module.exports = new LoginUserUseCase();
