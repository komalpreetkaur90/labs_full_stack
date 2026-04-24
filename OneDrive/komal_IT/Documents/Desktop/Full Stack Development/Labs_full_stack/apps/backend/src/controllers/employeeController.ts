import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { employeeService } from "../services/employeeService";

export const getEmployees = (req: Request, res: Response) => {
  const page = Number.parseInt(String(req.query.page ?? "1"), 10);
  const pageSize = Number.parseInt(String(req.query.pageSize ?? "8"), 10);
  const employees = employeeService.getEmployeesPage(page, pageSize);
  res.json(employees);
};

export const createEmployee = (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized - please log in" });
  }

  const { firstName, lastName, role } = req.body;

  if (!firstName || !lastName || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const employee = employeeService.createEmployee({
    firstName,
    lastName,
    role
  });

  res.status(201).json({
    ...employee,
    createdBy: userId
  });
};
