import type { Employee, PaginatedResponse } from "../types/Employee";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";
const API_URL = `${API_BASE_URL}/api/employees`;

export const employeeRepo = {
  /** Get all employees from backend */
  async getEmployees(page = 1, pageSize = 8): Promise<PaginatedResponse<Employee>> {
    const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return await response.json();
  },

  /** Create a new employee */
  async createEmployee(
    firstName: string,
    lastName: string,
    role: string,
    token: string
  ): Promise<Employee> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, role }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.error || "Failed to create employee");
    }

    return await response.json();
  }
};
