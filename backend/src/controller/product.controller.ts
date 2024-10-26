import { Request, Response } from "express";
import {CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput} from "../schema/product.schema";
import {
    createProduct,
    deleteProduct,
    findAndUpdateProduct,
    findProduct,
    findProducts
} from "../service/product.service";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id as string;

    const body = req.body;

    const product = await createProduct({
        ...body,
        user: userId
    });

    res.send(product);
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id as string;
    const { productId } = req.params;
    const body = req.body;

    const product = await findProduct({productId});

    if (product) {
        if (String(product.user) !== userId) {
            res.sendStatus(403);
        } else {
            const updatedProduct = await findAndUpdateProduct({productId}, body, {new: true});
            res.send(updatedProduct);
        }
    } else {
        res.sendStatus(404);
    }
}

export async function getProductHandler(req: Request<GetProductInput["params"]>, res: Response) {
    const { productId } = req.params;
    const product = await findProduct({productId});

    if (!product) {
        res.sendStatus(404);
    } else {
        res.send(product);
    }
}

export async function deleteProductHandler(req: Request<DeleteProductInput["params"]>, res: Response) {
    const userId = res.locals.user._id as string;
    const { productId } = req.params;

    const product = await findProduct({productId});

    if (product) {
        if (String(product.user) !== userId) {
            res.sendStatus(403);
        } else {
            await deleteProduct({productId});
            res.sendStatus(200);
        }
    } else {
        res.sendStatus(404);
    }
}



export async function getProductsHandler(req: Request, res: Response) {
    const products = await findProducts({});
    res.send(products);
}