import { useEffect, useState } from "react";
import type { Role } from "../types/Role";
import AddOrganizationForm from "./AddOrganizationForm";
import { organizationRepo } from "../repositories/organizationRepo";

export default function Organization() {
  // Store leaders in state to allow dynamic updates when new leaders are added
  const [leaders, setLeaders] = useState<Role[]>([]);

  // Load leaders from repository on component mount and whenever the organization changes
  useEffect(() => {
    setLeaders(organizationRepo.getAll());
  }, []);

  return (
    <section style={{ padding: "20px" }}>
      <h1>Leadership & Management</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "10px",
          marginTop: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {leaders.map((leader: Role, idx: number) => (
          <div key={idx} style={{ display: "contents" }}>
            <div style={{ fontWeight: "bold" }}>
              {leader.firstName} {leader.lastName}
            </div>
            <div style={{ textAlign: "right", fontStyle: "italic" }}>
              {leader.role}
            </div>
          </div>
        ))}
      </div>

      <AddOrganizationForm onSuccess={() => setLeaders([...organizationRepo.getAll()])} />
    </section>
  );
}