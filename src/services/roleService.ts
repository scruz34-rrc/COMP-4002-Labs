import * as RoleRepo from "../apis/roleRepo";
import type { Role } from "../types/role";

export interface CreateRoleResult {
  success: boolean;
  errors: string[];
  role?: Role;
}

export async function createRole(
  title: string,
  firstName: string,
  lastName: string
): Promise<CreateRoleResult> {
  const errors: string[] = [];

  if (firstName.trim().length < 3) {
    errors.push("First names must have at least three characters.");
  }

  const roles = RoleRepo.getRoles();
  const role = roles.find((r) => r.title === title);

  if (role && role.employee) {
    errors.push("Role is already occupied.");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const updatedRole = await RoleRepo.createRole(title, firstName, lastName);
  return { success: true, errors: [], role: updatedRole };
}