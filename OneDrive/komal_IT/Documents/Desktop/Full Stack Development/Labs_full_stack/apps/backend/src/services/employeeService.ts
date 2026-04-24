import { employeeRepository } from "../repositories/employeeRepository";
import { Employee } from "../types/Employee";

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

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

export const employeeService = {
  getEmployeesPage(page: number, pageSize: number): PaginatedResult<Employee> {
    return paginateItems(employeeRepository.getAll(), page, pageSize);
  },

  getEmployees(): Employee[] {
    return employeeRepository.getAll();
  },

  createEmployee(employee: Employee): Employee {
    return employeeRepository.create(employee);
  }
};
