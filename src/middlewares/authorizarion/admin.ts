import { JwtUtil } from '../../common';
import { NextFunction, Request, Response } from 'express';

// Admin authorization
export async function isAuthorizeAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        next();
    } catch (err: any) {
        next(err);
    }
}
