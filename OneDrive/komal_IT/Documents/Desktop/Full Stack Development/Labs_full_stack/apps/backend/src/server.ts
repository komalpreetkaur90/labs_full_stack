import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import employeeRoutes from "./routes/employeeRoutes";
import organizationRoutes from "./routes/organizationRoutes";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      try {
        const hostname = new URL(origin).hostname;

        if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(hostname)) {
          callback(null, true);
          return;
        }
      } catch {
        callback(new Error("Invalid origin"));
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    }
  })
);

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
