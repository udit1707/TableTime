import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsSearch } from "react-icons/bs";
import { outletDataSelector } from "@/selectors/outlets";
import { setFilteredOutlets } from "@/store/outlets";
import styles from "./SearchBar.module.css";

const SearchBar = ({ searchQuery = "", setSearchQuery }) => {
  const dispatch = useDispatch();
  const { list } = useSelector(outletDataSelector);

  const handleQueryChange = useCallback(
    (e) => {
      const queryString = e.target.value.toLowerCase();

      const filteredData = list.filter((obj) => {
        const name = `${obj.name}`.toLowerCase();
        const cuisine = `${obj.cuisine}`.toLowerCase();
        return name.includes(queryString) || cuisine.includes(queryString);
      });

      dispatch(setFilteredOutlets(filteredData));
      setSearchQuery(e.target.value);
    },
    [list, dispatch, setSearchQuery]
  );

  return (
    <div className={styles.searchBar}>
      <BsSearch className={styles.icon} />
      <input
        type="text"
        placeholder="Find your perfect food match"
        className={styles.input}
        onChange={handleQueryChange}
        value={searchQuery}
      />
    </div>
  );
};

export default SearchBar;
