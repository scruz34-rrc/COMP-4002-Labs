import { useRoles } from "../../../hooks/useRoles";
import { AddRoleForm } from "./AddRoleForm";
import styles from "../Features.module.css";

export function Organization() {
  const { roles, error, refresh } = useRoles();

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <>
      <section>
        <h1>Leadership and Management</h1>
        <table className={styles.table}>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td className={styles.roleName}>{r.title}</td>
                <td>
                  {r.employee?.firstName} {r.employee?.lastName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <AddRoleForm onRoleAdded={refresh} />
    </>
  );
}