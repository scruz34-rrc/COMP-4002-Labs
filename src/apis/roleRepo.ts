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
  const existing = roles.find((r) => r.title === title);

  if (existing) {
    if (existing.employee) {
      throw new Error("Role is already occupied");
    }
    existing.employee = {
      id: Guid.create().toString(),
      firstName,
      lastName,
    };
    return existing;
  }

  const newRole: Role = {
    id: Guid.create().toString(),
    title,
    employee: {
      id: Guid.create().toString(),
      firstName,
      lastName,
    },
  };

  roles.push(newRole);
  return newRole;
}