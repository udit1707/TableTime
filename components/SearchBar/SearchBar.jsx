import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <BsSearch className={styles.icon} />
      <input
        type="text"
        placeholder="Find your perfect food match"
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
