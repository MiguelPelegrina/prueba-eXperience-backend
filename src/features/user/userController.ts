import { Request, Response } from "express";
import { UserService } from "./userService";
import { UserQueryRequest } from "./models/userQueryRequest";
import { PagingParams } from "../shared/paginationParams";

export class UserController {
    /**
     * Handles GET /users request with filtering and pagination
     */
    static getUsersByCriteria(req: Request, res: Response) {
        try {
            const pagination: PagingParams = {
                page: parseInt(req.query.page as string) || 0,
                limit: parseInt(req.query.limit as string) || 10
            };

            // Extract query parameters dynamically
            const { page: _, limit: __, ...filters } = req.query;
            const queryParams: UserQueryRequest = filters as UserQueryRequest;

            const response = UserService.filterUsers(queryParams, pagination);
            res.status(200).json({ ...response });
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }
}