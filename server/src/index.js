import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import contactRouter from "./routes/contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/../.env" });

const app = express();

// Setup Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MyContacts API",
      version: "1.0.0",
      description: "Documentation de l'api MyContacts",
    },
  },
  apis: [__dirname + "/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());

app.use("/mycontacts/auth", authRouter);
app.use("/mycontacts/contacts", contactRouter);
app.use("/mycontacts/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// export pour les tests
export { app };

// Lancement du serveur en dehors des tests
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  // connexion à la base de données
  mongoose.connect(process.env.DATABASE_URL);
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("connected to database"));
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}
