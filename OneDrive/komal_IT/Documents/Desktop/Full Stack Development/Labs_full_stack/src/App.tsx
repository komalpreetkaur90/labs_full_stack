import { useState } from "react";
import Header from "./components/Header";
import Department from "./components/Department";
import Footer from "./components/Footer";
import { departments as initialDepartments  } from "./data/employees";
import type { Department as DeptType } from "./types/Employee";
import AddEmployeeForm from "./components/AddEmployeeForm";

function App() {
  const [departments, setDepartments] = useState<DeptType[]>(initialDepartments);
  return (
    <>
      {/* Application Header */}
      <Header />

      {/* Application Content */}
      <main style={{ padding: "20px" }}>
        {departments.map((dept, index) => (
          <Department key={index} department={dept} />
        ))}

        {/* Add Employee Form goes here */}
        <AddEmployeeForm 
        departments={departments} 
        setDepartments={setDepartments} 
        />
      </main>

      {/* Application Footer */}
      <Footer />
    </>
  );
}

export default App;