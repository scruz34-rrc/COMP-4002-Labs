import type { Department } from "../../../types/department";
import styles from "./Employees.module.css";

interface EmployeesProps {
  departments: Department[];
}

export function Employees({ departments }: EmployeesProps) {
  const departmentListElement = departments.map(department => (
    <section key={department.name}>
      <h2>{department.name}</h2>
      <ul className={styles.employees}>
        {department.employees.map((employee, index) => (
          <li key={`${employee.firstName}-${employee.lastName ?? ""}-${index}`}>
            {employee.firstName} {employee.lastName ?? ""}
          </li>
        ))}
      </ul>
    </section>
  ));

  return (
    <main>
      <section>
        <h1>Employees by Department</h1>
        {departmentListElement}
      </section>
    </main>
  );
}