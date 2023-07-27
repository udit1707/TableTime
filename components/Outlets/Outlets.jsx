import { useSelector } from "react-redux";

import { outletDataSelector, outletLoaderSelector } from "@/selectors/outlets";
import OutletCard from "../OutletCard/OutletCard";
import styles from "./Outlets.module.css";

const Outlets = () => {
  const { isLoading, loadError } = useSelector(outletLoaderSelector);
  const { queryList } = useSelector(outletDataSelector);

  return (
    <div className={styles.container}>
      {isLoading && <h1>Fetching Outlets</h1>}
      {loadError && <h1>Error Loading. Please refresh</h1>}
      {queryList?.map((i, index) => (
        <OutletCard
          key={index}
          img={i.img}
          cuisine={i.cuisine}
          name={i.name}
          distance={i.distance}
        />
      ))}{" "}
    </div>
  );
};

export default Outlets;
