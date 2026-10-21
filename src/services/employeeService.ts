import * as EmployeeRepo from "../apis/employeeRepo";
import type { Employee } from "../types/employee";

export interface CreateEmployeeResult {
  success: boolean;
  errors: string[];
  employee?: Employee;
}

export async function createEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): Promise<CreateEmployeeResult> {
  const errors: string[] = [];

  if (firstName.trim().length < 3) {
    errors.push("First names must have at least three characters.");
  }

  const departments = EmployeeRepo.getDepartments();
  const department = departments.find((d) => d.name === departmentName);
  if (!department) {
    errors.push("Employee must be in an existing department.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const employee = await EmployeeRepo.createEmployee(
    firstName,
    lastName,
    departmentName
  );
  return { success: true, errors: [], employee };
}