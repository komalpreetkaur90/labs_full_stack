import type { Employee } from "../types/Employee";

const API_URL = "http://localhost:3001/api/employees";

export const employeeRepo = {
  /** Get all employees from backend */
  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    return await response.json();
  },

  /** Create a new employee */
  async createEmployee(
    firstName: string,
    lastName: string,
    role: string
  ): Promise<Employee> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, role }),
    });

    if (!response.ok) {
      throw new Error("Failed to create employee");
    }

    return await response.json();
  }
};