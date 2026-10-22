import { useRoleForm } from "../../../hooks/useRoleForm";
import styles from "../Features.module.css";

interface AddRoleFormProps {
  onRoleAdded: () => void;
}

export function AddRoleForm({ onRoleAdded }: AddRoleFormProps) {
  const {
    titleInput,
    firstNameInput,
    lastNameInput,
    formErrors,
    handleSubmit,
  } = useRoleForm();

  const onSubmit = async (e: React.FormEvent) => {
    const result = await handleSubmit(e);
    if (result?.success) {
      onRoleAdded();
    }
  };

  return (
    <section className={styles.input}>
      <h2>Add New Role</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Role Title:{" "}
            <input
              type="text"
              value={titleInput.value}
              onChange={(e) => titleInput.setValue(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            First Name:{" "}
            <input
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
              type="text"
              value={lastNameInput.value}
              onChange={(e) => lastNameInput.setValue(e.target.value)}
            />
          </label>
        </div>

        <div>
          {formErrors.map((msg) => (
            <p className={styles.error} key={msg}>
              {msg}
            </p>
          ))}
        </div>

        <div>
          <input type="submit" value="Add Role" />
        </div>
      </form>
    </section>
  );
}