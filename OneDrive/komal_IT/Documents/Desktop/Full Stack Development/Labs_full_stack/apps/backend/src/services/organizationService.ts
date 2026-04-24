import { organizationRepository } from "../repositories/organizationRepository";
import type { Employee } from "../types/Employee";
import type { PaginatedResult } from "./employeeService";

function paginateItems<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * safePageSize;

  return {
    items: items.slice(startIndex, startIndex + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    totalItems,
    totalPages
  };
}

export const organizationService = {
  getOrganizationsPage(page: number, pageSize: number): PaginatedResult<Employee> {
    return paginateItems(organizationRepository.getAll(), page, pageSize);
  },

  getOrganizations(): Employee[] {
    return organizationRepository.getAll();
  },

  createOrganization(organization: Employee): Employee {
    return organizationRepository.create(organization);
  }
};
