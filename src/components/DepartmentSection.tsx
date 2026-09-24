import type { Department } from "../types";

interface DepartmentSectionProps {
    department: Department;
}

export default function DepartmentSection({ department }: DepartmentSectionProps) {
    return (
        <section className="department">
            <h2>{department.name}</h2>
            <ul className="employee-list">
                {department.employees.map((employee, index) => (
                    <li key={`${employee.firstName}-${employee.lastName ?? index}`}>
                        {employee.lastName
                            ? `${employee.firstName} ${employee.lastName}`
                            : employee.firstName}
                    </li>
                ))}
            </ul>
        </section>
    );
}