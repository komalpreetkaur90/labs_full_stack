import { useOrganizationForm } from "../hooks/useOrganizationForm";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth
} from "@clerk/clerk-react";

interface Props {
  onSuccess: () => Promise<void> | void;
}

export function AddOrganizationForm({ onSuccess }: Props) {
  const { getToken } = useAuth();
  const {
    firstName,
    lastName,
    role,
    errors,
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
    loading
  } = useOrganizationForm(onSuccess, getToken);

  return (
    <>
      <SignedIn>
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

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
        </section>
      </SignedIn>

      <SignedOut>
        <section
          style={{
            marginTop: "30px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxWidth: "320px"
          }}
        >
          <h2>Add New Leader</h2>
          <p>You must log in to add leaders.</p>
          <SignInButton mode="modal">
            <button type="button">Log In</button>
          </SignInButton>
        </section>
      </SignedOut>
    </>
  );
}
