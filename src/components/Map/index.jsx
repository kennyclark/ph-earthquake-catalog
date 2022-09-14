import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';

import { MAP_LAYER_EARTHQUAKE } from 'constants';

const Map = ({ earthquakes }) => {
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
      zoom: zoom,
    });

    map.current.on('load', () => {
      setIsMapLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current.loaded()) return;
    const source = map.current.getSource('earthquakes');
    if (!source) {
      map.current.addSource('earthquakes', earthquakes);
    } else if (earthquakes.data.features.length) {
      source.setData(earthquakes.data);
    }
    const layer = map.current.getLayer('earthquakes');
    if (!layer) {
      map.current.addLayer(MAP_LAYER_EARTHQUAKE, 'place_label_other');
    }
  });

  return (
    <>
      <Backdrop open={isMapLoading}>
        <CircularProgress />
      </Backdrop>
      <div className={styles.container} ref={mapContainer} />
    </>
  );
};

export default Map;
