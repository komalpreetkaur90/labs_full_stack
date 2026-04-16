import { organizations } from "../data/organizationData";
import type { Employee } from "../types/Employee";

export const organizationRepository = {
  getAll(): Employee[] {
    return organizations;
  },

  create(organization: Employee): Employee {
    organizations.push(organization);
    return organization;
  }
};
