const mockDynamoDb = {
  get: jest.fn().mockReturnThis(),
  put: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  query: jest.fn().mockReturnThis(),
  scan: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

const AWS = {
  DynamoDB: {
    DocumentClient: jest.fn(() => mockDynamoDb),
  },
  Credentials: jest.fn(),
};

module.exports = AWS;
