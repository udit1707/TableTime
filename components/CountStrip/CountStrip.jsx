import { useSelector } from "react-redux";
import styles from "./CountStrip.module.css";
import { outletDataSelector } from "@/selectors/outlets";

const CountStrip = () => {
  const { queryList } = useSelector(outletDataSelector);

  if (queryList?.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.line}></div>
        <div className={styles.text}>{queryList?.length} Restaurants near you</div>
        <div className={styles.line}></div>
      </div>
    );
  } else return null;
};

export default CountStrip;
