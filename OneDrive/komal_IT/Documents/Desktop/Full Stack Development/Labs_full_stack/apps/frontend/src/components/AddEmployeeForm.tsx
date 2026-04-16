import React, { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth
} from "@clerk/clerk-react";
import { employeeRepo } from "../repositories/employeeRepo";
import type { Department } from "../types/Employee";

interface AddEmployeeFormProps {
  departments: Department[];
  refreshDepartments: () => Promise<void> | void;
}

export default function AddEmployeeForm({
  departments,
  refreshDepartments
}: AddEmployeeFormProps) {
  const { getToken } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (departments.length > 0 && !selectedDept) {
      setSelectedDept(departments[0].name);
    }
  }, [departments, selectedDept]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const errors: string[] = [];
    if (firstName.trim().length < 3) {
      errors.push("First name must be at least 3 characters.");
    }
    if (!lastName.trim()) {
      errors.push("Last name is required.");
    }
    if (!departments.some((department) => department.name === selectedDept)) {
      errors.push("Selected department does not exist.");
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join(" "));
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();

      if (!token) {
        setErrorMessage("User not authenticated. Please log in.");
        return;
      }

      await employeeRepo.createEmployee(
        firstName.trim(),
        lastName.trim(),
        selectedDept,
        token
      );

      await refreshDepartments();
      setFirstName("");
      setLastName("");
      setSelectedDept(departments[0]?.name || "");
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            borderTop: "1px solid #ccc",
            paddingTop: "20px"
          }}
        >
          <h3>Add New Employee</h3>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </div>

          <div>
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.currentTarget.value)}
            >
              {departments.map((department) => (
                <option key={department.name} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </SignedIn>

      <SignedOut>
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            maxWidth: "320px"
          }}
        >
          <h3>Add New Employee</h3>
          <p>You must log in to add employees.</p>
          <SignInButton mode="modal">
            <button type="button">Log In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
