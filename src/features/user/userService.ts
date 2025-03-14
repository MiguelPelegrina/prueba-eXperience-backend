import { PagingParams } from "../shared/paginationParams";
import { users } from "./data/users";
import { User } from "./models/user";
import { UserQueryRequest } from "./models/userQueryRequest";
import { UserResponse } from "./models/userQueryResponse";


/**
 * Normalizes query parameters by trimming spaces and converting to lowercase.
 *
 * @param {UserQueryRequest} queryParams - The filtering criteria for users.
 * @returns {Partial<Record<keyof User, string>>} - Normalized filter criteria.
 */
function normalizeQueryParams(queryParams: UserQueryRequest): Partial<Record<keyof User, string>> {
    return Object.fromEntries(
        Object.entries(queryParams)
            .filter(([_, value]) => typeof value === "string")
            .map(([key, value]) => [key as keyof User, value.trim().toLowerCase()])
    );
}

/**
 * Filters users dynamically based on query parameters.
 *
 * @param {Partial<Record<keyof User, string>>} filters - Normalized query filters.
 * @returns {User[]} - Filtered list of users.
 */
function filterUsersByCriteria(filters: Partial<Record<keyof User, string>>): User[] {
    return users.filter(user =>
        Object.entries(filters).every(([key, value]) =>
            user[key as keyof User]?.toString().toLowerCase().includes(value)
        )
    );
}

/**
 * Applies pagination to a filtered list of users.
 *
 * @param {User[]} filteredUsers - The filtered users list.
 * @param {PagingParams} pagination - Pagination parameters.
 * @returns {UserResponse} - The paginated user response.
 */
function paginateUsers(filteredUsers: User[], pagination: PagingParams): UserResponse {
    const { page = 0, limit = 10 } = pagination;
    const totalResults = filteredUsers.length;
    const totalPages = Math.ceil(totalResults / limit);
    const startIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    return {
        data: paginatedUsers,
        totalResults,
        totalPages,
        currentPage: page
    };
}

/**
 * Filters and paginates users based on query parameters.
 *
 * @param {UserQueryRequest} queryParams - The filtering criteria for users.
 * @param {PagingParams} pagination - Pagination parameters (page number and limit).
 * @returns {UserResponse} - The filtered and paginated list of users.
 */
export function filterUsers(queryParams: UserQueryRequest, pagination: PagingParams): UserResponse {
    const filters = normalizeQueryParams(queryParams);
    const filteredUsers = filterUsersByCriteria(filters);
    return paginateUsers(filteredUsers, pagination);
}

