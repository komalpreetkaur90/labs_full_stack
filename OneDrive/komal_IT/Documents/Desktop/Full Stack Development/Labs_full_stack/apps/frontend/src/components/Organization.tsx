import { useEffect, useState } from "react";
import type { Role } from "../types/Role";
import { AddOrganizationForm } from "./AddOrganizationForm";
import { organizationRepo } from "../repositories/organizationRepo";

export default function Organization() {
  const [leaders, setLeaders] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await organizationRepo.getAll();
        setLeaders(data);
      } catch (err: any) {
        setError(err.message || "Failed to load leaders");
      }
    };

    fetchLeaders();
  }, []);

  if (error) return <div>Error: {error}</div>;

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

      <AddOrganizationForm
        onSuccess={async () => {
          const data = await organizationRepo.getAll();
          setLeaders(data);
        }}
      />
    </section>
  );
}