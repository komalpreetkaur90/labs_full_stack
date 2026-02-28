import { useOrganizationForm } from "../hooks/useOrganizationForm";

interface Props {
  onSuccess: () => void; // tells page to refresh list after adding new leader
}

export default function AddOrganizationForm({ onSuccess }: Props) {
  const {
    firstName,
    lastName,
    role,
    errors,           // < updated to errors
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
  } = useOrganizationForm(onSuccess);

  return (
    <section style={{ marginTop: "30px" }}>
      <h2>Add New Leader</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {errors.length > 0 && (
          <ul style={{ color: "red", marginBottom: "10px" }}>
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