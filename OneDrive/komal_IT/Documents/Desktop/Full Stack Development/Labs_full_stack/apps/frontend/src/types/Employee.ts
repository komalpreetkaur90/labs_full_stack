export interface Employee {
  firstName: string;
  lastName: string;
  role: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Department {
  name: string;           // department name
  employees: Employee[];  // array of employees
}
