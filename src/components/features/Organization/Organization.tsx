import organizationData from "../../../data/organization";
import styles from "./Organization.module.css";

export function Organization() {
    const roleListElement = organizationData.map((person, index) => (
        <li key={index} className={styles.roleItem}>
            <span className={styles.name}>
                {person.firstName} {person.lastName}
            </span>
            <span className={styles.role}>{person.role}</span>
        </li>
    ));

    return (
        <main>
            <section>
                <h1>Organization Leadership</h1>
                <ul className={styles.roleList}>{roleListElement}</ul>
            </section>
        </main>
    );
}