import { useState } from 'react'
import { Employees } from './components/features/employees/Employees'
import { Footer } from './components/layout/footer/Footer'
import { Header } from './components/layout/header/Header'
import { EmployeeForm } from './components/features/employees/EmployeeForm'
import departmentData from './data/departments'
import type { Department } from './types/department'
import type { Employee } from './types/employee'

function App() {
  const [departments, setDepartments] = useState<Department[]>(departmentData)

  function addEmployee(departmentName: string, employee: Employee) {
    setDepartments(prevDepartments =>
      prevDepartments.map(department =>
        department.name === departmentName
          ? {
              ...department,
              employees: [...department.employees, employee],
            }
          : department
      )
    )
  }

  return (
    <>
      <Header />
      <Employees departments={departments} />
      <EmployeeForm
        departments={departments}
        onAddEmployee={addEmployee}
      />
      <Footer />
    </>
  )
}

export default App