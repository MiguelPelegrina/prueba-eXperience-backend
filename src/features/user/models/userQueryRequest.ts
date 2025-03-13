import { PagingParams as PaginationParams } from "../../shared/paginationParams";
import { User } from "./user";

/**
 * Defines query parameters for user filtering
 */
export type UserQueryRequest = Partial<Omit<User, 'id'>> & PaginationParams 