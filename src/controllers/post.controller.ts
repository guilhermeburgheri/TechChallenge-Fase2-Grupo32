import { getPostById } from "../services/post/getPostById.service";
import { getAllPosts } from "../services/post/getAllPosts.service";
import { NextFunction, Request, Response } from "express";
import { postParamsSchema, postQuerySchema } from "../validation/post.schema";
import { formatPostReponse } from "../utils/formatPostReponse.util";

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { page, limit} = postQuerySchema.parse(req.query);

        const posts = await getAllPosts(page, limit);
        res.status(200).json(posts.map(formatPostReponse));
    } catch (error) {
        next(error);
    }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = postParamsSchema.parse(req.params);
        
        const post = await getPostById(id);
        res.status(200).json(formatPostReponse(post));
    } catch(error) {
        next(error);
    }
}