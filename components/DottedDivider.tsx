import styles from "./DottedDivider.module.css";

export function DottedDivider() {
  return <div aria-hidden="true" data-dotted-divider="" className={styles.divider} />;
}
