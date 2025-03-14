"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByCriteria = getUsersByCriteria;
const userService_1 = require("./userService");
/**
 * Parses pagination parameters from request query.
 *
 * @param {Request} req - The Express request object.
 * @returns {PagingParams} - Parsed pagination parameters.
 */
function parsePaginationParams(req) {
    return {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10
    };
}
/**
 * Extracts and normalizes filtering criteria from request query.
 *
 * @param {Request} req - The Express request object.
 * @returns {UserQueryRequest} - Extracted query parameters.
 */
function extractQueryParams(req) {
    const _a = req.query, { page: _, limit: __ } = _a, filters = __rest(_a, ["page", "limit"]);
    return filters;
}
/**
 * Handles GET /users request with filtering and pagination.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
function getUsersByCriteria(req, res) {
    try {
        const pagination = parsePaginationParams(req);
        const queryParams = extractQueryParams(req);
        const response = (0, userService_1.filterUsers)(queryParams, pagination);
        res.status(200).json(Object.assign({}, response));
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
