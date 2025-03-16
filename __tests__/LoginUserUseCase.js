jest.mock("aws-sdk");
const { DynamoDB } = require("aws-sdk");

const mockDynamoDb = {
  get: jest.fn().mockReturnThis(),
  put: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  scan: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

DynamoDB.DocumentClient.mockImplementation(() => mockDynamoDb);

const loginUserUseCase = require("../src/usecases/LoginUserUseCase");

describe("LoginUserUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve falhar ao realizar login com CPF inexistente", async () => {
    mockDynamoDb.get.mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });

    await expect(
      loginUserUseCase.execute({ cpf: "00000000000", password: "senha123" })
    ).rejects.toThrow("CPF ou senha inválidos");
  });
});
