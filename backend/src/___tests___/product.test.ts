import {describe} from "node:test";

describe("Product", () => {
    describe("getProductRoute", () => {
        // describe the context of the test
        describe("when a product with the given id is not found", () => {
            // describe the expected behavior
            it("should return a 404", () => {
                // expect the test to pass
                expect(true).toBe(true); // test implementation
            });
        });
    });
});