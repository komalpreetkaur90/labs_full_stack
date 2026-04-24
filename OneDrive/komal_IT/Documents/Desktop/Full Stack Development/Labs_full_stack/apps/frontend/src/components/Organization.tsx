import { useEffect, useState } from "react";
import { AddOrganizationForm } from "./AddOrganizationForm";
import { organizationRepo } from "../repositories/organizationRepo";
import type { Leader } from "../types/Organization";

export default function Organization() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeaders, setTotalLeaders] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLeaders = async (requestedPage = page) => {
    try {
      setLoading(true);
      const data = await organizationRepo.getAll(requestedPage, 8);
      setLeaders(data.items);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotalLeaders(data.totalItems);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load leaders";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders(page);
  }, [page]);

  if (error) return <div>Error: {error}</div>;

  return (
    <section style={{ padding: "20px" }}>
      <h1>Leadership & Management</h1>
      {loading ? <p>Loading leaders...</p> : <p>Showing page {page} of {totalPages} for {totalLeaders} leaders.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "10px",
          marginTop: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {leaders.map((leader, idx) => (
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

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1 || loading}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
          disabled={page === totalPages || loading}
        >
          Next
        </button>
      </div>

      <AddOrganizationForm onSuccess={() => fetchLeaders(page)} />
    </section>
  );
}
