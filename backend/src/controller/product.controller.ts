import { Request, Response } from "express";
import {CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput} from "../schema/product.schema";
import {createProduct, deleteProduct, findAndUpdateProduct, findProduct} from "../service/product.service";
import {ProductDocument} from "../models/product.model";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id as string;

    const body = req.body;

    const post = await createProduct({
        ...body,
        user: userId
    });

    return res.send(post);
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id as string;
    const { productId } = req.params;
    const body = req.body;

    const product = await findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({productId}, body, {new: true});

    return res.send(updatedProduct);
}

export async function getProductHandler(req: Request<GetProductInput["params"]>, res: Response) {
    const { productId } = req.params;
    const product = await findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    return res.send(product);
}

export async function deleteProductHandler(req: Request<DeleteProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id as string;
    const { productId } = req.params;

    const product = await findProduct({productId});

    if (!product) {
        return res.sendStatus(404);
    }

    if (product.user !== userId) {
        return res.sendStatus(403);
    }

    await deleteProduct({productId});

    return res.sendStatus(200);
}



export async function getAllProductsHandler(req: Request, res: Response) {

}