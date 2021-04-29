import { Input } from "../../atoms/input/input";
import styles from "./ElementFinder.module.scss"

const ElementFinder: React.FC = ({ children }) => (
  <div className={styles.list}>
    <Input placeholder="Select for a number" />
    {children}
  </div>
);

export default ElementFinder;
