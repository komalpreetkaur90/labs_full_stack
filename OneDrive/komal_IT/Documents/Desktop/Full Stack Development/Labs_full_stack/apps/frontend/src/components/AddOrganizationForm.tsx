import { useOrganizationForm } from "../hooks/useOrganizationForm";

interface Props {
  onSuccess: () => void;
}

export function AddOrganizationForm({ onSuccess }: Props) {
  const { firstName, lastName, role, errors, setFirstName, setLastName, setRole, handleSubmit } =
    useOrganizationForm(onSuccess);

  return (
    <section style={{ marginTop: "30px" }}>
      <h2>Add New Leader</h2>
      <form onSubmit={handleSubmit}>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />

        {errors.length > 0 && (
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        <button type="submit">Add</button>
      </form>
    </section>
  );
}