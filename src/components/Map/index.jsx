import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import CircularProgress from '@mui/material/CircularProgress';

import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [lng] = useState(process.env.REACT_APP_DEFAULT_LNG);
  const [lat] = useState(process.env.REACT_APP_DEFAULT_LAT);
  const [zoom] = useState(process.env.REACT_APP_DEFAULT_ZOOM);

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAP_STYLE,
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      setIsMapLoading(false);
    })
  });

  return <>
    { isMapLoading && <div className={styles.loading}><CircularProgress /></div>}
    <div className={styles.container} ref={mapContainer} />
  </>;
}

export default Map;