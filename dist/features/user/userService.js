"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUsers = filterUsers;
const users_1 = require("./data/users");
/**
 * Normalizes query parameters by trimming spaces and converting to lowercase.
 *
 * @param {UserQueryRequest} queryParams - The filtering criteria for users.
 * @returns {Partial<Record<keyof User, string>>} - Normalized filter criteria.
 */
function normalizeQueryParams(queryParams) {
    return Object.fromEntries(Object.entries(queryParams)
        .filter(([_, value]) => typeof value === "string")
        .map(([key, value]) => [key, value.trim().toLowerCase()]));
}
/**
 * Filters users dynamically based on query parameters.
 *
 * @param {Partial<Record<keyof User, string>>} filters - Normalized query filters.
 * @returns {User[]} - Filtered list of users.
 */
function filterUsersByCriteria(filters) {
    return users_1.users.filter(user => Object.entries(filters).every(([key, value]) => { var _a; return (_a = user[key]) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase().includes(value); }));
}
/**
 * Applies pagination to a filtered list of users.
 *
 * @param {User[]} filteredUsers - The filtered users list.
 * @param {PagingParams} pagination - Pagination parameters.
 * @returns {UserResponse} - The paginated user response.
 */
function paginateUsers(filteredUsers, pagination) {
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
function filterUsers(queryParams, pagination) {
    const filters = normalizeQueryParams(queryParams);
    const filteredUsers = filterUsersByCriteria(filters);
    return paginateUsers(filteredUsers, pagination);
}
