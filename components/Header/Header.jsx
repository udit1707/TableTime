import Geocode from "react-geocode";

import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  locationDataSelector,
  locationLoaderSelector,
} from "@/selectors/location";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("in");
Geocode.setLocationType("ROOFTOP");

const Header = ({ location, setOpenLocationPicker }) => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    Geocode.fromLatLng(location.lat, location.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>Pickup Now</div>
      <div className={styles.locationContainer}>
        <div className={styles.location}>{address}</div>
        <MdKeyboardArrowDown
          className={styles.icon}
          onClick={() => setOpenLocationPicker(true)}
        />
      </div>
    </div>
  );
};

const HeaderWrapper = ({ setOpenLocationPicker }) => {
  const { isLoading, loadError } = useSelector(locationLoaderSelector);
  const { currentLocation } = useSelector(locationDataSelector);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.label}>Pickup Now</div>
        <div className={styles.locationContainer}>
          <h3>Fetching Location...</h3>
        </div>
      </div>
    );
  } else if (loadError) {
    return (
      <div className={styles.container}>
        <div className={styles.label}>Pickup Now</div>
        <div className={styles.locationContainer}>
          <h3>Error Fetching Location...</h3>
        </div>
      </div>
    );
  } else {
    if (currentLocation) {
      return (
        <Header
          location={currentLocation}
          setOpenLocationPicker={setOpenLocationPicker}
        />
      );
    }
  }
};

export default HeaderWrapper;
