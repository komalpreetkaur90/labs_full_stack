import type { Employee, Department } from "../types/Employee";
import { departments as initialDepartments } from "../data/employees";

// Initialize repo with full dataset
let departments: Department[] = [...initialDepartments];

export const employeeRepo = {
  /** Get all departments with their employees */
  getDepartments(): Department[] {
    return departments;
  },

  /** Get all employees in a specific department */
  getEmployeesByDepartment(departmentName: string): Employee[] {
    const dept = departments.find(d => d.name === departmentName);
    return dept ? dept.employees : [];
  },

  /** Create a new employee */
  createEmployee(firstName: string, lastName: string, departmentName: string): Employee {
    const department = departments.find(d => d.name === departmentName);
    if (!department) throw new Error("Department not found");

    const newEmployee: Employee = { firstName, lastName };
    department.employees.push(newEmployee);
    return newEmployee;
  },

  /** Delete an employee by name and department */
  deleteEmployee(firstName: string, lastName: string, departmentName: string): boolean {
    const department = departments.find(d => d.name === departmentName);
    if (!department) return false;

    const index = department.employees.findIndex(
      e => e.firstName === firstName && e.lastName === lastName
    );

    if (index === -1) return false;

    department.employees.splice(index, 1);
    return true;
  },

  /** Update an employee’s name */
  updateEmployee(
    oldFirstName: string,
    oldLastName: string,
    departmentName: string,
    newFirstName: string,
    newLastName: string
  ): Employee | null {
    const department = departments.find(d => d.name === departmentName);
    if (!department) return null;

    const employee = department.employees.find(
      e => e.firstName === oldFirstName && e.lastName === oldLastName
    );
    if (!employee) return null;

    employee.firstName = newFirstName;
    employee.lastName = newLastName;
    return employee;
  }
};