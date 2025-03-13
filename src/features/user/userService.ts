import { PagingParams } from "../shared/paginationParams";
import { users } from "./data/users";
import { User } from "./models/user";
import { UserQueryRequest } from "./models/userQueryRequest";
import { UserResponse } from "./models/userQueryResponse";

export class UserService {
    /**
    * Filters and paginates users based on query parameters
    */
   /**
     * Filters and paginates users based on query parameters
     */
   static filterUsers(queryParams: UserQueryRequest, pagination: PagingParams): UserResponse {
    const { page = 0, limit = 10 } = pagination;

    // Normalize query parameters (lowercase & trim)
    const filters = Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (typeof value === "string") {
            acc[key as keyof User] = value.trim().toLowerCase();
        }
        return acc;
    }, {} as Partial<Record<keyof User, string>>);

    // Filter users dynamically
    let filteredUsers = users.filter(user =>
        Object.entries(filters).every(([key, value]) =>
            user[key as keyof User]?.toString().toLowerCase().includes(value)
        )
    );

    // Pagination logic
    const totalResults = filteredUsers.length;
    const totalPages = Math.ceil(totalResults / limit);
    const startIndex = (page ) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return {
        data: paginatedUsers,
        totalResults,
        totalPages,
        currentPage: page
    };
}
}
