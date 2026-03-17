import { employees } from "../data/employeeData"
import { Employee } from "../types/Employee"

export const employeeRepository = {

  getAll(): Employee[] {
    return employees
  },

  create(employee: Employee): Employee {
    employees.push(employee)
    return employee
  }

}