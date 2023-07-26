import { MdKeyboardArrowDown } from "react-icons/md";

import styles from "./Header.module.css";

const Header = ({ location = "Madiwala New Extension, 1st Stage" }) => {
  const address = location.split(" ");
  const words = address.slice(0, 3).join(" ");
  let locationText = words;

  if (address.length > 3) {
    locationText = words.slice(0, 15) + "...";
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>Pickup Now</div>
      <div className={styles.locationContainer}>
        <div className={styles.location}>{locationText}</div>
        <MdKeyboardArrowDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Header;
