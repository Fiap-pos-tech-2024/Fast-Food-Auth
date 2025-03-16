const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
  credentials: new AWS.Credentials("fakeAccessKeyId", "fakeSecretAccessKey"),
});

const TABLE_NAME = process.env.USERS_TABLE || "Users";

class UserRepository {
  async create(user) {
    // Verifica se o usuário já existe
    const existingUser = await this.findByCpf(user.cpf);
    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const params = {
      TableName: TABLE_NAME,
      Item: {
        cpf: user.cpf,
        password: user.password,
      },
      ConditionExpression: "attribute_not_exists(cpf)",
    };

    await dynamoDb.put(params).promise();
    return user;
  }

  async findByCpf(cpf) {
    const params = {
      TableName: TABLE_NAME,
      Key: { cpf },
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item;
  }
}

module.exports = new UserRepository();
