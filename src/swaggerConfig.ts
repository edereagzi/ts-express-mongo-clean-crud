import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./src/docs/*.ts"],
};

const specs = swaggerJSDoc(options);

export default specs;
