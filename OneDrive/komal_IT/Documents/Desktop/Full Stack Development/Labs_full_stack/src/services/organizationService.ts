import { organizationRepo } from "../repositories/organizationRepo";

export const organizationService = {
  validate(
    firstName: string,
    lastName: string,
    role: string
  ): string[] {
    const errors: string[] = [];

    // First name minimum 3 characters
    if (firstName.trim().length < 3) {
      errors.push("First name must be at least 3 characters.");
    }

    // Last name required
    if (lastName.trim().length === 0) {
      errors.push("Last name is required.");
    }

    // Role required
    if (role.trim().length === 0) {
      errors.push("Role is required.");
    }

    // Role cannot already exist
    const existing = organizationRepo
      .getAll()
      .find((person) => person.role === role);

    if (existing) {
      errors.push("This role is already occupied.");
    }

    return errors;
  },
};