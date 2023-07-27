import React, { useCallback, useState } from "react";
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
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
    console.log("clicking");
    console.log(event.latLng.lat(), event.latLng.lng());
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    setMapCenter(newPosition);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={{ height: "40rem", width: "100%" }}
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
  const { currentLocation, defaultPosition } =
    useSelector(locationDataSelector);
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
    setMarkerPosition(defaultPosition);
    setMapCenter(defaultPosition);
    dispatch(updateLocation(defaultPosition));
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
