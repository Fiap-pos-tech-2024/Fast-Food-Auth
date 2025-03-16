jest.mock("aws-sdk");

const registerUserUseCase = require("../src/usecases/RegisterUserUseCase");
const { DynamoDB } = require("aws-sdk");

describe("RegisterUserUseCase", () => {
  beforeEach(() => {
    DynamoDB.DocumentClient().put.mockClear();
    DynamoDB.DocumentClient().promise.mockClear();
  });

  test("deve registrar um novo usuário", async () => {
    const cpf = "12345678900";
    const password = "senha123";
    DynamoDB.DocumentClient().put().promise.mockResolvedValue({});
    const user = await registerUserUseCase.execute({ cpf, password });
    expect(user).toBeDefined();
    expect(user.cpf).toBe(cpf);
  });
});
