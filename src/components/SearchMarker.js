import React, { useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { rentStrikeIcon } from '../lib/leaflet';

export default ({ coords, content = 'Search Location' }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    markerRef.current.openPopup();
    return () => null;
  }, [markerRef]);

  if (!coords) return <></>;
  //TODO :
  // switch popup icon
  return (
    <Marker position={coords} icon={rentStrikeIcon} ref={markerRef}>
      <Popup>{content} </Popup>
    </Marker>
  );
};
