import { useEffect, useState } from "react";
import * as RoleRepo from "../apis/roleRepo";
import type { Role } from "../types/role";

export function useRoles(dependencies: unknown[] = []) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string>();

  const fetchRoles = () => {
    try {
      const result = RoleRepo.getRoles();
      setRoles([...result]);
    } catch (err) {
      setError(`${err}`);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, dependencies);

  return { roles, error, refresh: fetchRoles };
}