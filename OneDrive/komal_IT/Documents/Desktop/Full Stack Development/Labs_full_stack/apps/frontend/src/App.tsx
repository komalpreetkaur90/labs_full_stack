import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Department from "./components/Department";
import AddEmployeeForm from "./components/AddEmployeeForm";
import Organization from "./components/Organization";
import { employeeRepo } from "./repositories/employeeRepo";
import type { Department as DeptType } from "./types/Employee";

function App() {
  const [departments, setDepartments] = useState<DeptType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDepartments = async () => {
    try {
      setIsLoading(true);
      const employees = await employeeRepo.getEmployees();
      const groupedDepartments = employees.reduce<DeptType[]>((groups, employee) => {
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

      setDepartments(groupedDepartments);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load employees.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshDepartments();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employees" replace />} />

      <Route
        path="/employees"
        element={
          <Layout>
            {isLoading && <p>Loading employees...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && departments.map((dept, index) => (
              <Department key={index} department={dept} />
            ))}
            <AddEmployeeForm
              departments={departments}
              refreshDepartments={refreshDepartments}
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
