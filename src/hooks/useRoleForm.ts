import { useState } from "react";
import { useFormInput } from "./useFormInput";
import * as RoleService from "../services/roleService";
import type { CreateRoleResult } from "../services/roleService";

export function useRoleForm() {
  const titleInput = useFormInput("");
  const firstNameInput = useFormInput("");
  const lastNameInput = useFormInput("");
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = async (
    e: React.FormEvent
  ): Promise<CreateRoleResult | undefined> => {
    e.preventDefault();
    setFormErrors([]);

    const result = await RoleService.createRole(
      titleInput.value,
      firstNameInput.value,
      lastNameInput.value
    );

    if (result.success) {
      titleInput.setValue("");
      firstNameInput.setValue("");
      lastNameInput.setValue("");
      titleInput.setMessages([]);
      firstNameInput.setMessages([]);
      lastNameInput.setMessages([]);
    } else {
      setFormErrors(result.errors);
    }

    return result;
  };

  return {
    titleInput,
    firstNameInput,
    lastNameInput,
    formErrors,
    handleSubmit,
  };
}