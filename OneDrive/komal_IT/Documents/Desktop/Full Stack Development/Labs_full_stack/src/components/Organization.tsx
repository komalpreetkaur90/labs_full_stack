import { leaders } from "../data/organization";
import type { Role } from "../types/Role";

export default function Organization() {
  return (
    <section style={{ padding: "20px" }}>
      <h1>Leadership & Management</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr", // left column for name, right column for role
          gap: "10px",
          marginTop: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {leaders.map((leader: Role, idx: number) => (
          <>
            <div style={{ fontWeight: "bold" }} key={`name-${idx}`}>
              {leader.firstName} {leader.lastName}
            </div>
            <div style={{ textAlign: "right", fontStyle: "italic" }} key={`role-${idx}`}>
              {leader.role}
            </div>
          </>
        ))}
      </div>
    </section>
  );
}