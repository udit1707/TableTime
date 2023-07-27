import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOutlets } from "@/store/outlets";
import styles from "../styles/Index.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import BannerCarousel from "@/components/BannerCarousel/BannerCarousel";
import Outlets from "@/components/Outlets/Outlets";
import LocationPickerWrapper from "@/components/LocationPickerWrapper/LocationPickerWrapper";
import { locationDataSelector } from "@/selectors/location";
import { getLocation } from "@/store/location";
import HeaderWrapper from "@/components/Header/Header";
import CountStrip from "@/components/CountStrip/CountStrip";

const Index = () => {
  const dispatch = useDispatch();
  const { currentLocation } = useSelector(locationDataSelector);
  const [searchQuery, setSearchQuery] = useState("");
  const [openLocationPicker, setOpenLocationPicker] = useState(false);

  useEffect(() => {
    if (!currentLocation) dispatch(getLocation());

    if (currentLocation) {
      dispatch(getOutlets(currentLocation));
    }
  }, [currentLocation]);

  return (
    <div className={styles.container}>
      <HeaderWrapper setOpenLocationPicker={setOpenLocationPicker} />
      {openLocationPicker ? (
        <LocationPickerWrapper setOpenLocationPicker={setOpenLocationPicker} />
      ) : (
        <>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <BannerCarousel />
          <CountStrip />
          <Outlets />
        </>
      )}
    </div>
  );
};

export default Index;
