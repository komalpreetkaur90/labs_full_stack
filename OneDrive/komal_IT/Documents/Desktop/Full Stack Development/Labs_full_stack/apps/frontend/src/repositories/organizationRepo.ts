import type { Leader } from "../types/Organization";

export const organizationRepo = {
  async getAll(): Promise<Leader[]> {
    const res = await fetch("http://localhost:3001/api/leaders");
    if (!res.ok) {
      throw new Error("Failed to fetch leaders");
    }
    return res.json() as Promise<Leader[]>;
  },

  async create(firstName: string, lastName: string, role: string, token: string): Promise<Leader> {
    const res = await fetch("http://localhost:3001/api/leaders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName, role })
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.error || "Failed to create leader");
    }

    return res.json() as Promise<Leader>;
  },

  async roleExists(role: string): Promise<boolean> {
    const leaders = await this.getAll();
    return leaders.some((person: Leader) => person.role.toLowerCase() === role.toLowerCase());
  }
};
