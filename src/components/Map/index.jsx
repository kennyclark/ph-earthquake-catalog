import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import { useQueryClient } from '@tanstack/react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LegendControl from 'components/custom/LegendControl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.css';
import { toGeoJSON } from 'utils';
import { MAP_LAYER_EARTHQUAKE } from 'constants';

const Map = (props) => {
  const { earthquakes, isFetchingEarthquakes, dateRange, magnitudeRange } =
    props;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [lng] = useState(process.env.REACT_APP_DEFAULT_LNG);
  const [lat] = useState(process.env.REACT_APP_DEFAULT_LAT);
  const [zoom] = useState(process.env.REACT_APP_DEFAULT_ZOOM);

  const queryClient = useQueryClient();

  const earthquakesGeoJSON = useMemo(() => {
    return toGeoJSON(earthquakes);
  }, [earthquakes]);

  const applyFilters = useCallback(
    (layerId) => {
      map.current.setFilter(layerId, [
        'all',
        ['>=', ['get', 'magnitude'], magnitudeRange[0]],
        ['<=', ['get', 'magnitude'], magnitudeRange[1]],
      ]);
    },
    [magnitudeRange]
  );

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAP_STYLE,
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
      })
    );

    map.current.addControl(new LegendControl(), 'bottom-right');

    map.current.on('load', () => {
      // NOTE: need to manually set map source on initial load of map
      const geoJSON = toGeoJSON(
        queryClient.getQueryData([
          'earthquakes',
          dateRange.start,
          dateRange.end,
        ])
      );
      map.current.addSource('earthquakes', geoJSON);
      map.current.addLayer(MAP_LAYER_EARTHQUAKE, 'place_label_other');
      applyFilters('earthquakes');

      map.current.fitBounds(
        new maplibregl.LngLatBounds(
          new maplibregl.LngLat(115, 5),
          new maplibregl.LngLat(130, 20)
        ),
        { padding: { left: 150 }, maxZoom: 10 }
      );
    });

    map.current.on('sourcedata', (event) => {
      const { sourceDataType, isSourceLoaded } = event;
      if (!sourceDataType && isSourceLoaded && isMapLoading) {
        setIsMapLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current.loaded()) return;

    const source = map.current.getSource('earthquakes');
    if (!source) {
      map.current.addSource('earthquakes', earthquakesGeoJSON);
    } else {
      if (!isFetchingEarthquakes) {
        setIsMapLoading(true);
        source.setData(earthquakesGeoJSON.data);
      }
    }

    if (!map.current.getLayer('earthquakes')) {
      map.current.addLayer(MAP_LAYER_EARTHQUAKE, 'place_label_other');
    }

    applyFilters('earthquakes');
  }, [earthquakesGeoJSON, isFetchingEarthquakes, applyFilters]);

  useEffect(() => {
    if (!map.current.loaded() || !map.current.getLayer('earthquakes')) return;
    applyFilters('earthquakes');
  }, [magnitudeRange, applyFilters]);

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
