import type { Department as DeptType } from "../types/Employee";

interface Props {
  department: DeptType;
}

export default function Department({ department }: Props) {
  return (
    <section style={{ marginBottom: "20px" }}>
      <h2>{department.name}</h2>
      <ul>
        {department.employees.map((emp, index) => (
          <li key={index}>
            {emp.firstName} {emp.lastName || ""}
          </li>
        ))}
      </ul>
    </section>
  );
}