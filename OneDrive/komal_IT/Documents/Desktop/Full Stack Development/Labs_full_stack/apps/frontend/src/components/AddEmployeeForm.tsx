import React, { useState } from "react";
import type { Department} from "../types/Employee";
import { tryCreateEmployee} from "../services/employeeService";

interface AddEmployeeFormProps {
  departments: Department[];
  refreshDepartments: () => void; 
}

export default function AddEmployeeForm({ departments, refreshDepartments }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    // Attempt to create employee via service
    const result = tryCreateEmployee(firstName, lastName, selectedDept);

    if (!result.isValid) {
      setErrorMessage(result.errors.join(" "));
      return;
    }

    // Refresh departments from repo
    refreshDepartments();

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