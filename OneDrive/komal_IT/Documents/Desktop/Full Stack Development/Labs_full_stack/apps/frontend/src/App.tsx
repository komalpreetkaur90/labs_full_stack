import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Department from "./components/Department";
import AddEmployeeForm from "./components/AddEmployeeForm";
import Organization from "./components/Organization";
import { employeeRepo } from "./repositories/employeeRepo";
import type { Department as DeptType, Employee } from "./types/Employee";

const EMPLOYEE_PAGE_SIZE = 8;

function groupDepartments(employees: Employee[]): DeptType[] {
  return employees.reduce<DeptType[]>((groups, employee) => {
    const existingDepartment = groups.find((department) => department.name === employee.role);
    if (existingDepartment) {
      existingDepartment.employees.push(employee);
      return groups;
    }

    groups.push({
      name: employee.role,
      employees: [employee]
    });
    return groups;
  }, []);
}

function App() {
  const [departments, setDepartments] = useState<DeptType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const refreshDepartments = async (requestedPage = page) => {
    try {
      setIsLoading(true);
      const response = await employeeRepo.getEmployees(requestedPage, EMPLOYEE_PAGE_SIZE);
      setDepartments(groupDepartments(response.items));
      setPage(response.page);
      setTotalPages(response.totalPages);
      setTotalEmployees(response.totalItems);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load employees.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshDepartments(page);
  }, [page]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />

      <Route
        path="/employees"
        element={
          <Layout>
            {isLoading && <p>Loading employees...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
              <>
                <p>
                  Showing page {page} of {totalPages} for {totalEmployees} employees.
                </p>
                {departments.map((dept, index) => (
                  <Department key={index} department={dept} />
                ))}
                <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1 || isLoading}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages || isLoading}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            <AddEmployeeForm
              departments={departments}
              refreshDepartments={() => refreshDepartments(page)}
            />
          </Layout>
        }
      />

      <Route
        path="/organization"
        element={
          <Layout>
            <Organization />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
