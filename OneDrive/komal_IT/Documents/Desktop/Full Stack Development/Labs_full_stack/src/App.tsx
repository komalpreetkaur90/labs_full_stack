import Header from "./components/Header";
import Department from "./components/Department";
import Footer from "./components/Footer";
import { departments } from "./data/employees";
import type { Department as DeptType } from "./types/Employee";

function App() {
  return (
    <>
      {/* Application Header */}
      <Header />

      {/* Application Content */}
      <main style={{ padding: "20px" }}>
        {departments.map((dept: DeptType, index: number) => (
          <Department key={index} department={dept} />
        ))}
      </main>

      {/* Application Footer */}
      <Footer />
    </>
  );
}

export default App;