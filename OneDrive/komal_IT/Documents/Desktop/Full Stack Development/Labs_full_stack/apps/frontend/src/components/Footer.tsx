export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ textAlign: "center", padding: "10px", backgroundColor: "#eee" }}>
      <p>Copyright Pixell River Financial {year}</p>
    </footer>
  );
}