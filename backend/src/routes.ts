import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler
} from "./controller/session.controller";
import {createSessionSchema} from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler
} from "./controller/product.controller";

function routes(app: Express) {
  // Healthcheck endpoint
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Register user
  app.post(
    "/api/users",
    validateResource(createUserSchema),
    createUserHandler,
  );

  // Login user
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler,
  );

  // Get user's sessions
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  // Logout user
  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);


  // Product routes
    app.post("/api/products", requireUser, validateResource(createProductSchema), createProductHandler);
    app.put("/api/products/:productId", requireUser, validateResource(updateProductSchema), updateProductHandler);
    app.get("/api/products/:productId", validateResource(getProductSchema), getProductHandler);
    app.delete("/api/products/:productId", requireUser, validateResource(deleteProductSchema), deleteProductHandler);
}

export default routes;