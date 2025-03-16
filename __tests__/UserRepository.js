const { DynamoDB } = require("aws-sdk");
const userRepository = require("../src/repositories/UserRepository");
const User = require("../src/domain/entities/User");

describe("UserRepository - método create", () => {
  let mockDocumentClient;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDocumentClient = new DynamoDB.DocumentClient();
  });

  test("deve criar um novo usuário com sucesso", async () => {
    mockDocumentClient.promise
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce({});

    const user = new User("12345678900", "senha123");

    const createdUser = await userRepository.create(user);

    expect(createdUser).toEqual(user);

    expect(mockDocumentClient.get).toHaveBeenCalledTimes(1);
    expect(mockDocumentClient.put).toHaveBeenCalledTimes(1);
  });

  test("deve lançar erro ao tentar criar um usuário que já existe", async () => {
    mockDocumentClient.promise.mockResolvedValueOnce({
      Item: { cpf: "12345678900", password: "senha123" },
    });

    const user = new User("12345678900", "senha123");

    await expect(userRepository.create(user)).rejects.toThrow(
      "Usuário já existe"
    );

    expect(mockDocumentClient.put).not.toHaveBeenCalled();
  });
});
