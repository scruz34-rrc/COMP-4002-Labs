// src/components/features/employees/Employees.tsx
import { useEffect, useState } from "react";
import { useFormInput } from "../../../hooks/useFormInput";
import * as EmployeeService from "../../../services/employeeService";
import * as EmployeeRepo from "../../../apis/employeeRepo";
import type { Department } from "../../../types/department";
import styles from "../Features.module.css";

export function Employees() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const firstNameInput = useFormInput("");
  const lastNameInput = useFormInput("");
  const departmentInput = useFormInput("");

  useEffect(() => {
    setDepartments(EmployeeRepo.getDepartments());
  }, []);

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    const firstNameValidation = firstNameInput.validate((value) => {
      if (value.trim().length < 3) {
        return ["First names must have at least three characters."];
      }
      return null;
    });

    const departmentValidation = departmentInput.validate((value) => {
      const exists = departments.some((d) => d.name === value);
      if (!exists) {
        return ["Employee must be in an existing department."];
      }
      return null;
    });

    if (!firstNameValidation.isValid || !departmentValidation.isValid) {
      return;
    }

    const result = await EmployeeService.createEmployee(
      firstNameInput.value,
      lastNameInput.value,
      departmentInput.value
    );

    if (result.success) {
      setDepartments(EmployeeRepo.getDepartments());
      firstNameInput.setValue("");
      lastNameInput.setValue("");
      departmentInput.setValue("");
      firstNameInput.setMessages([]);
      departmentInput.setMessages([]);
    } else {
      setFormErrors(result.errors);
    }
  };

  const departmentListElement = departments.map((d) => (
    <section key={d.id}>
      <h2>{d.name}</h2>
      <ul className={styles.employees}>
        {d.employees.map((e) => (
          <li key={e.id}>
            {e.firstName} {e.lastName}
          </li>
        ))}
      </ul>
    </section>
  ));

  const departmentDropdownInput = (
    <select
      value={departmentInput.value}
      onChange={(e) => departmentInput.setValue(e.target.value)}
    >
      <option value="">-- Select Department --</option>
      {departments.map((d) => (
        <option key={"opt" + d.id} value={d.name}>
          {d.name}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <section>
        <h1>Employees by Department</h1>
        {departmentListElement}
      </section>
      <section className={styles.input}>
        <h2>Add New Employee</h2>
        <form onSubmit={handleEmployeeSubmit}>
          <div>
            <label>
              First Name:{" "}
              <input
                name="firstName"
                type="text"
                value={firstNameInput.value}
                onChange={(e) => firstNameInput.setValue(e.target.value)}
              />
            </label>
            {firstNameInput.messages.map((msg) => (
              <p className={styles.error} key={msg}>
                {msg}
              </p>
            ))}
          </div>
          <div>
            <label>
              Last Name:{" "}
              <input
                name="lastName"
                type="text"
                value={lastNameInput.value}
                onChange={(e) => lastNameInput.setValue(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>Department: {departmentDropdownInput}</label>
            {departmentInput.messages.map((msg) => (
              <p className={styles.error} key={msg}>
                {msg}
              </p>
            ))}
          </div>
          <div>
            {formErrors.map((msg) => (
              <p className={styles.error} key={msg}>
                {msg}
              </p>
            ))}
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </section>
    </>
  );
}