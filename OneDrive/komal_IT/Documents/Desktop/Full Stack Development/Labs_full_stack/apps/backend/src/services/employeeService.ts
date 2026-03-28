import { employeeRepository } from "../repositories/employeeRepository"
import { Employee } from "../types/Employee"

export const employeeService = {

  getEmployees(): Employee[] {
    return employeeRepository.getAll()
  },

  createEmployee(employee: Employee): Employee {
    return employeeRepository.create(employee)
  }

}