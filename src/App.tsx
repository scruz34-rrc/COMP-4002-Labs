import Header from "./components/Header";
import Footer from "./components/Footer";
import DepartmentSection from "./components/DepartmentSection";
import { departments } from "./data/departments";

function App() {
    return (
        <>
            <Header />
            <main id="main-content">
                {departments.map((department) => (
                    <DepartmentSection
                        key={department.name}
                        department={department}
                    />
                ))}
            </main>
            <Footer />
        </>
    );
}

export default App;