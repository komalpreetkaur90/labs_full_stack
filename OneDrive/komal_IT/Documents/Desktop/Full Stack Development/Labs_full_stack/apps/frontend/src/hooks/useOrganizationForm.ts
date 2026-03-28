import { useState } from "react";
import { organizationRepo } from "../repositories/organizationRepo";

export function useOrganizationForm(onSuccess: () => void) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];

    if (firstName.length < 3) newErrors.push("First name must be at least 3 characters");
    if (!lastName) newErrors.push("Last name is required");
    if (!role) newErrors.push("Role is required");

    // Check if role already exists via backend
    try {
      const exists = await organizationRepo.roleExists(role);
      if (exists) newErrors.push("This role is already occupied");
    } catch (err) {
      newErrors.push("Failed to check role. Backend might be down.");
      console.error(err);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create leader via backend
    try {
      await organizationRepo.create(firstName, lastName, role);
      setFirstName("");
      setLastName("");
      setRole("");
      onSuccess(); // refresh parent component
    } catch (err) {
      setErrors(["Failed to create leader."]);
      console.error(err);
    }
  };

  return {
    firstName,
    lastName,
    role,
    errors,
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
  };
}