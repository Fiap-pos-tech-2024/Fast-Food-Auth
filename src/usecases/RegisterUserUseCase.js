const User = require("../domain/entities/User");
const userRepository = require("../repositories/UserRepository");

class RegisterUserUseCase {
  async execute({ cpf, password }) {
    // Em produção, a senha deve ser armazenada com hash.
    const user = new User(cpf, password);
    return await userRepository.create(user);
  }
}

module.exports = new RegisterUserUseCase();
