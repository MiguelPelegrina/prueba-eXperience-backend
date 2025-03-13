import { User } from "./user";

/**
 * Defines the structure of a paginated response
 */
export interface UserResponse {
    data: User[];
    totalResults: number;
    totalPages: number;
    currentPage: number;
}