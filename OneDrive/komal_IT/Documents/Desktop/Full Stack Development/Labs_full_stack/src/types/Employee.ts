export interface Employee {
  firstName: string;
  lastName: string;
}


export interface Department {
  name: string;           // department name
  employees: Employee[];  // array of employees
}