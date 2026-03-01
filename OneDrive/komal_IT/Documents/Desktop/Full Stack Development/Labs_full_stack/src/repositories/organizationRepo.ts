import type { Leader } from "../types/Organization";

// Initialize repo with dataset
let organization: Leader[] = [
  { firstName: "Beth", lastName: "Smith", role: "Manager" },
  { firstName: "Miguel", lastName: "Lopez", role: "Director" }
];

//
export const organizationRepo = {

  getAll(): Leader[] {
    return organization;
  },
// Create a new leader in the organization
  create(firstName: string, lastName: string, role: string): Leader {
    const newPerson: Leader = { firstName, lastName, role };
    organization.push(newPerson);
    return newPerson;
  },
// Check if a role already exists in the organization
  roleExists(role: string): boolean {
    return organization.some(person => person.role === role);
  }

};