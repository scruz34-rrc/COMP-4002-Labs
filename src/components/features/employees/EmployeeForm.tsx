import { useState } from "react";
import type { FormEvent } from "react";
import type { Department } from "../../../types/department";
import type { Employee } from "../../../types/employee";

interface EmployeeFormProps {
  departments: Department[];
  onAddEmployee: (departmentName: string, employee: Employee) => void;
}

export function EmployeeForm({
  departments,
  onAddEmployee,
}: EmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentName, setDepartmentName] = useState(
    departments[0]?.name ?? ""
  );
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const newErrors: string[] = [];

    if (trimmedFirstName.length < 3) {
      newErrors.push("First name must be at least 3 characters.");
    }

    const departmentExists = departments.some(
      department => department.name === departmentName
    );

    if (!departmentExists) {
      newErrors.push("Please select an existing department.");
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    onAddEmployee(departmentName, {
      firstName: trimmedFirstName,
      lastName: trimmedLastName || undefined,
    });

    setFirstName("");
    setLastName("");
  }

  return (
    <section>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul role="alert">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={departmentName}
            onChange={event => setDepartmentName(event.target.value)}
          >
            {departments.map(department => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}