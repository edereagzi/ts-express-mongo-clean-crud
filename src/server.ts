import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { connectToDatabase } from "./helpers";
import routes from "./routes";
import { errorHandler } from "./middlewares";
import specs from "./swaggerConfig";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 8080;

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", routes);

app.use(errorHandler);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

export default app;
