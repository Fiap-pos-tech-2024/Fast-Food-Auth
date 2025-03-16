const userController = require("./controllers/UserController");

exports.handler = async (event) => {
  console.log("Evento recebido:", event);

  // Roteamento simples baseado no método HTTP e caminho
  if (event.httpMethod === "POST" && event.path === "/register") {
    return await userController.register(event);
  } else if (event.httpMethod === "POST" && event.path === "/login") {
    return await userController.login(event);
  } else if (event.httpMethod === "GET" && event.path === "/verify-token") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Token válido" }),
    };
    // return await userController.verifyToken(event);
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Rota não encontrada" }),
    };
  }
};
