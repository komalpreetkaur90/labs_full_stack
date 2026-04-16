import { useState } from "react";
import { organizationRepo } from "../repositories/organizationRepo";

export function useOrganizationForm(
  onSuccess: () => Promise<void> | void,
  getToken: () => Promise<string | null>
) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];

    if (firstName.trim().length < 3) newErrors.push("First name must be at least 3 characters.");
    if (!lastName.trim()) newErrors.push("Last name is required.");
    if (!role.trim()) newErrors.push("Role is required.");

    try {
      const exists = await organizationRepo.roleExists(role);
      if (exists) newErrors.push("This role is already occupied.");
    } catch (err) {
      newErrors.push("Failed to check whether this role is already occupied.");
      console.error(err);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        setErrors(["You must log in to add leaders."]);
        return;
      }

      await organizationRepo.create(firstName.trim(), lastName.trim(), role.trim(), token);
      setFirstName("");
      setLastName("");
      setRole("");
      await onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create leader.";
      setErrors([message]);
      console.error(err);
    } finally {
      setLoading(false);
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
    loading,
  };
}
