import { BsDot } from "react-icons/bs";

import styles from "./OutletCard.module.css";

const OutletCard = ({ name, img, cuisine, distance }) => {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnailContainer}>
        <img src={img} alt="outlet-img" className={styles.thumbnail} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          {(distance / 1000).toFixed(1)}km
        </div>
        <BsDot className={styles.dotIcon} />
        <div className={styles.footerText}>{cuisine}</div>
      </div>
    </div>
  );
};

export default OutletCard;
