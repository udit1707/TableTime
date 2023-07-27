import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import secureLocalStorage from "react-secure-storage";
import {
  locationDataSelector,
  locationLoaderSelector,
} from "@/selectors/location";
import { updateLocation } from "@/store/location";
import { updateOutletDistance } from "@/store/outlets";
import styles from "./LocationPickerWrapper.module.css";

const Map = ({
  markerPosition,
  setMarkerPosition,
  mapCenter,
  setMapCenter,
}) => {
  const handleMarkerPositionChange = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setMapCenter(newPosition);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{ height: "100%", width: "100%" }}
      center={mapCenter}
      zoom={15}
      onClick={handleMarkerPositionChange}
    >
      <MarkerF
        position={markerPosition}
        draggable={true}
        onDragEnd={handleMarkerPositionChange}
      />
    </GoogleMap>
  );
};

const LocationPickerWrapper = ({ setOpenLocationPicker }) => {
  const dispatch = useDispatch();
  const { isLoading, loadError } = useSelector(locationLoaderSelector);
  const { currentLocation } = useSelector(locationDataSelector);
  const [markerPosition, setMarkerPosition] = useState({
    ...currentLocation,
  });
  const [mapCenter, setMapCenter] = useState({
    ...currentLocation,
  });

  const handleSetAddress = () => {
    dispatch(updateLocation(markerPosition));
    dispatch(updateOutletDistance(markerPosition));
    setOpenLocationPicker(false);
  };

  const handleCurrentAddress = () => {
    const defaultPosition = JSON.parse(
      secureLocalStorage.getItem("defaultAddress")
    );

    setMarkerPosition(defaultPosition);
    setMapCenter(defaultPosition);
  };

  return (
    <div>
      {isLoading && <h1>Loading Map...</h1>}
      {loadError && <h1>Error Loading Map</h1>}
      {currentLocation && (
        <div className={styles.container}>
          <Map
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleSetAddress} className={styles.btnSet}>
              Set Location
            </button>
            <button
              onClick={handleCurrentAddress}
              className={styles.btnCurrent}
            >
              Current Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPickerWrapper;
