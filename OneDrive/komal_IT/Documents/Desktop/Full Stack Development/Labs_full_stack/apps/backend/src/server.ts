import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import organizationRoutes from "./routes/organizationRoutes";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
  })
);

app.use("/api/employees", employeeRoutes);
app.use("/api/leaders", organizationRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
