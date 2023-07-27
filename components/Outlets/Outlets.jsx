import { useSelector } from "react-redux";
import classNames from "classnames";
import BarLoader from "react-spinners/ClipLoader";

import { outletDataSelector, outletLoaderSelector } from "@/selectors/outlets";
import OutletCard from "../OutletCard/OutletCard";
import styles from "./Outlets.module.css";

const Outlets = () => {
  const { isLoading, loadError } = useSelector(outletLoaderSelector);
  const { queryList } = useSelector(outletDataSelector);

  return (
    <div
      className={classNames(styles.container, { [styles.loading]: isLoading })}
    >
      {isLoading && (
        <BarLoader
          loading={true}
          cssOverride={{ borderColor: "orange", width: "5rem", height: "5rem" }}
        />
      )}
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
