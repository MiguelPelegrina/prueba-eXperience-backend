import { Request, Response } from "express";
import { UserQueryRequest } from "./models/userQueryRequest";
import { PagingParams } from "../shared/paginationParams";
import { filterUsers } from "./userService";

/**
 * Parses pagination parameters from request query.
 *
 * @param {Request} req - The Express request object.
 * @returns {PagingParams} - Parsed pagination parameters.
 */
function parsePaginationParams(req: Request): PagingParams {
    return {
        page: parseInt(req.query.page as string) || 0,
        limit: parseInt(req.query.limit as string) || 10
    };
}

/**
 * Extracts and normalizes filtering criteria from request query.
 *
 * @param {Request} req - The Express request object.
 * @returns {UserQueryRequest} - Extracted query parameters.
 */
function extractQueryParams(req: Request): UserQueryRequest {
    const { page: _, limit: __, ...filters } = req.query;
    return filters as UserQueryRequest;
}

/**
 * Handles GET /users request with filtering and pagination.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export function getUsersByCriteria(req: Request, res: Response) {
    try {
        const pagination = parsePaginationParams(req);
        const queryParams = extractQueryParams(req);
        const response = filterUsers(queryParams, pagination);
        res.status(200).json({ ...response });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
