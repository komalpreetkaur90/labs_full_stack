import { organizationRepository } from "../repositories/organizationRepository";
import type { Employee } from "../types/Employee";

export const organizationService = {
  getOrganizations(): Employee[] {
    return organizationRepository.getAll();
  },

  createOrganization(organization: Employee): Employee {
    return organizationRepository.create(organization);
  }
};
