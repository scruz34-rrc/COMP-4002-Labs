import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export function Nav() {
    return (
        <nav className={styles.nav}>
            <NavLink
                to="/employees"
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Employees
            </NavLink>
            <NavLink
                to="/organization"
                className={({ isActive }) => (isActive ? styles.active : "")}
            >
                Organization
            </NavLink>
        </nav>
    );
}