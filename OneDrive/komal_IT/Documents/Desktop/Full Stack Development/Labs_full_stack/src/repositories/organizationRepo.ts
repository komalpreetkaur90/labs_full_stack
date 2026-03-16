import type { Leader } from "../types/Organization";

export const organizationRepo = {
  // Fetch all leaders from the backend
  async getAll(): Promise<Leader[]> {
    const res = await fetch("http://localhost:3001/api/leaders");
    if (!res.ok) {
      throw new Error("Failed to fetch leaders");
    }
    return res.json() as Promise<Leader[]>;
  },

  // Create a new leader in the backend
  async create(firstName: string, lastName: string, role: string): Promise<Leader> {
    const res = await fetch("http://localhost:3001/api/leaders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, role })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.errors?.join(", ") || "Failed to create leader");
    }

    return res.json() as Promise<Leader>;
  },

  // Check if a role already exists in the organization
  async roleExists(role: string): Promise<boolean> {
    const leaders: Leader[] = await this.getAll();
    return leaders.some((person: Leader) => person.role === role);
  }
};