import {number, object, string, TypeOf} from "zod";

export const payload = {
    body: object({
        title: string({ required_error: "Title is required" }),
        description: string({ required_error: "Description is required" }).min(100, "Description must be at least 100 characters"),
        price: number({ required_error: "Price is required" }),
        image: string({ required_error: "Image is required" }),
    }),
};

const params = {
    params: object({
        productId: string({ required_error: "Product ID is required" }),
    }),
};

export const createProductSchema = object({
    ...payload
});

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const getProductSchema = object({
    ...params
})

export const deleteProductSchema = object({
    ...params
});

export type createProductInput = TypeOf<typeof createProductSchema>
export type updateProductInput = TypeOf<typeof updateProductSchema>
export type getProductInput = TypeOf<typeof getProductSchema>
export type deleteProductInput = TypeOf<typeof deleteProductSchema>
