import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Department from "./components/Department";
import AddEmployeeForm from "./components/AddEmployeeForm";
import Organization from "./components/Organization";
import { departments as initialDepartments } from "./data/employees";

import { getAllDepartments } from "./services/employeeService"; 
import type { Department as DeptType } from "./types/Employee";

function App() {
  const [departments, setDepartments] = useState<DeptType[]>(initialDepartments);

  // Refresh state from repository after CRUD operations
  const refreshDepartments = () => setDepartments(getAllDepartments());

  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/employees" replace />} />

      {/* Employees Page */}
      <Route
        path="/employees"
        element={
          <Layout>
            {departments.map((dept, index) => (
              <Department key={index} department={dept} />
            ))}

            <AddEmployeeForm
              departments={departments}
              refreshDepartments={refreshDepartments} // ✅ fixed
            />
          </Layout>
        }
      />

      {/* Organization Page */}
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