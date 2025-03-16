const userRepository = require("../repositories/UserRepository");

class LoginUserUseCase {
  async execute({ cpf, password }) {
    const user = await userRepository.findByCpf(cpf);
    if (!user || user.password !== password) {
      throw new Error("CPF ou senha inválidos");
    }
    return user;
  }
}

module.exports = new LoginUserUseCase();
