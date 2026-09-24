import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Employees } from "./components/features/employees/Employees";
import { Organization } from "./components/features/organization/Organization";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Employees />} />
                <Route path="employees" element={<Employees />} />
                <Route path="organization" element={<Organization />} />
            </Route>
        </Routes>
    );
}

export default App;