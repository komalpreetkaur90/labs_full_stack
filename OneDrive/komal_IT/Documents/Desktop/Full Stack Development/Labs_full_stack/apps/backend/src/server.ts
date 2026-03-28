import express from "express"
import cors from "cors"
import employeeRoutes from "./routes/employeeRoutes"

const app = express()

// Allow only the Vite front-end to access the API
app.use(cors({
  origin: "http://localhost:5173" // Vite front-end port
}))

app.use(express.json())

// Keep the API routes organized in a separate file
app.use("/api/employees", employeeRoutes)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})