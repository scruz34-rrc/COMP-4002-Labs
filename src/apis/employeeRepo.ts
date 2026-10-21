import type { Department } from "../types/department";
import type { Employee } from "../types/employee";
import { Guid } from "guid-typescript";
import { departmentData } from "../data/departments";

let departments: Department[] = [...departmentData];

export function getDepartments(): Department[] {
  return departments;
}

export async function createEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): Promise<Employee> {
  const department = departments.find((d) => d.name === departmentName);
  if (!department) {
    throw new Error("Department not found");
  }

  const newEmployee: Employee = {
    id: Guid.create().toString(),
    firstName,
    lastName,
  };

  department.employees.push(newEmployee);
  return newEmployee;
}