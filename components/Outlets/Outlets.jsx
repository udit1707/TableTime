import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOutlets } from "@/store/outlets";
import { outletDataSelector, outletLoaderSelector } from "@/selectors/outlets";
import OutletCard from "../OutletCard/OutletCard";
import styles from "./Outlets.module.css";

const Outlets = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const { isLoading, loadError } = useSelector(outletLoaderSelector);
  const { queryList } = useSelector(outletDataSelector);

  useEffect(() => {
    if (!currentLocation) {
      const pos = navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentLocation(pos);
      });
    }

    if (currentLocation) {
      dispatch(getOutlets(currentLocation));
    }
  }, [currentLocation]);

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
