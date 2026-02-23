import { employeeRepo } from "../repositories/employeeRepo";
import type { Employee, Department } from "../types/Employee";

/**
 * Attempts to create an employee.
 * Handles business logic validation.
 */
export function tryCreateEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate first name length
  if (firstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters.");
  }

  // Validate department exists
  const departmentExists = employeeRepo
    .getDepartments()
    .some(d => d.name === departmentName);

  if (!departmentExists) {
    errors.push("Selected department does not exist.");
  }

  // Return errors if any
  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Create employee in repository
  employeeRepo.createEmployee(firstName, lastName, departmentName);
  return { isValid: true, errors: [] };
}

/**
 * Attempts to delete an employee by name and department
 */
export function tryDeleteEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate department exists
  const departmentExists = employeeRepo
    .getDepartments()
    .some(d => d.name === departmentName);

  if (!departmentExists) {
    errors.push("Department does not exist.");
    return { success: false, errors };
  }

  // Attempt deletion
  const deleted = employeeRepo.deleteEmployee(firstName, lastName, departmentName);
  if (!deleted) {
    errors.push("Employee not found.");
    return { success: false, errors };
  }

  return { success: true, errors: [] };
}

/**
 * Attempts to update an employee's name
 */
export function tryUpdateEmployee(
  oldFirstName: string,
  oldLastName: string,
  departmentName: string,
  newFirstName: string,
  newLastName: string
): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate first name
  if (newFirstName.trim().length < 3) {
    errors.push("First name must be at least 3 characters.");
  }

  // Validate department exists
  const departmentExists = employeeRepo
    .getDepartments()
    .some(d => d.name === departmentName);

  if (!departmentExists) {
    errors.push("Department does not exist.");
  }

  if (errors.length > 0) return { success: false, errors };

  // Attempt update
  const updated = employeeRepo.updateEmployee(
    oldFirstName,
    oldLastName,
    departmentName,
    newFirstName,
    newLastName
  );

  if (!updated) {
    errors.push("Employee not found.");
    return { success: false, errors };
  }

  return { success: true, errors: [] };
}

/**
 * Get all employees in a department
 */
export function getEmployeesByDepartment(departmentName: string): Employee[] {
  return employeeRepo.getEmployeesByDepartment(departmentName);
}

/**
 * Get all departments with employees
 */
export function getAllDepartments(): Department[] {
  return employeeRepo.getDepartments();
}