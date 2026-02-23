import React, { useState } from "react";
import type { Department, Employee } from "../types/Employee";

interface AddEmployeeFormProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

export default function AddEmployeeForm({ departments, setDepartments }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous error
    setErrorMessage("");

    // Validation
    if (firstName.trim().length < 3) {
      setErrorMessage("First Name must be at least 3 characters.");
      return;
    }

    if (!selectedDept) {
      setErrorMessage("Please select a department.");
      return;
    }

    // Clear previous error
    setErrorMessage("");

    const newEmployee: Employee = { firstName, lastName };

    // Add employee to the selected department
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.name === selectedDept
          ? { ...dept, employees: [...dept.employees, newEmployee] }
          : dept
      )
    );

    // Reset form
    setFirstName("");
    setLastName("");
    setSelectedDept(departments[0]?.name || "");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}
    >
      <h3>Add New Employee</h3>

      {/* Error message */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "5px" }}>First Name:</label>
        <input value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "5px" }}>Last Name:</label>
        <input value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "5px" }}>Department:</label>
        <select value={selectedDept} onChange={(e) => setSelectedDept(e.currentTarget.value)}>
          {departments.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add Employee</button>
    </form>
  );
}