import { departments } from "../data/employees";
import type { Employee, Department } from "../types/Employee";

// Legacy local-data helpers kept only so old imports do not fail type-checking.
export function tryCreateEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters.");
  }

  if (!lastName.trim()) {
    errors.push("Last name is required.");
  }

  const departmentExists = departments.some(
    (department) => department.name === departmentName
  );

  if (!departmentExists) {
    errors.push("Selected department does not exist.");
  }

  return { isValid: errors.length === 0, errors };
}

export function tryDeleteEmployee(): { success: boolean; errors: string[] } {
  return {
    success: false,
    errors: ["Delete is handled by the backend in the current app."]
  };
}

export function tryUpdateEmployee(): { success: boolean; errors: string[] } {
  return {
    success: false,
    errors: ["Update is handled by the backend in the current app."]
  };
}

export function getEmployeesByDepartment(departmentName: string): Employee[] {
  return (
    departments.find((department) => department.name === departmentName)?.employees ?? []
  );
}

export function getAllDepartments(): Department[] {
  return departments;
}
