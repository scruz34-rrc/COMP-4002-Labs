import { roleData } from "../data/roles";
import type { Role } from "../types/role";
import { Guid } from "guid-typescript";

let roles: Role[] = [...roleData];

export function getRoles(): Role[] {
  return roles;
}

export async function createRole(
  title: string,
  firstName: string,
  lastName: string
): Promise<Role> {
  const role = roles.find((r) => r.title === title);
  if (!role) {
    throw new Error("Role not found");
  }
  if (role.employee) {
    throw new Error("Role is already occupied");
  }

  const newEmployee = {
    id: Guid.create().toString(),
    firstName,
    lastName,
  };

  role.employee = newEmployee;
  return role;
}