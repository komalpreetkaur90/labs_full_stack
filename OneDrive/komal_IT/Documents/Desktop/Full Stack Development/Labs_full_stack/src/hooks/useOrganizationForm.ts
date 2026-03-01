import { useState } from "react";
import { organizationService } from "../services/organizationService";
import { organizationRepo } from "../repositories/organizationRepo";

// Named export for the custom hook to manage form state and logic
export function useOrganizationForm(onSuccess: () => void) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<string[]>([]); // store multiple errors

  // Handle form submission
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs using service layer, which returns an array of error messages if validation fails
    const validationErrors = organizationService.validate(firstName, lastName, role);

    if (validationErrors.length > 0) {
      setErrors(validationErrors); // show all validation errors
      return;
    }

    // Add new leader to the organization using repository layer
    organizationRepo.create(firstName, lastName, role);

    // Reset form
    setFirstName("");
    setLastName("");
    setRole("");
    setErrors([]);

    // Notify parent component of successful submission
    onSuccess();
  };

  return {
    firstName,
    lastName,
    role,
    errors,       // expose errors to the component for display
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
  };
}