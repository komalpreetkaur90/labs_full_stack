export interface Employee {
  firstName: string;
  lastName: string;
  role: string;
}

export interface Department {
  name: string;           // department name
  employees: Employee[];  // array of employees
}