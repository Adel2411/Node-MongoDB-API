import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("Product", () => {
  describe("getProductRoute", () => {
    describe("when a product with the given id is not found", () => {
      it("should return a 404", async () => {
        const productId = "product_123";

        await supertest(app).get(`/product/${productId}`).expect(404);
      });
    });
  });
});
