import { useState, useMemo } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { subWeeks, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import GeoJSON from 'geojson';
import Map from 'components/Map';
import Filter from 'components/Filter';
import { useFetchEarthquakes } from 'api/earthquake';

const App = () => {
  const [end, setEnd] = useState(endOfDay(Date.now()));
  const [start, setStart] = useState(startOfDay(subWeeks(end, 1)));
  const [magnitudeRange, setMagnitudeRange] = useState([2.0, 8.0]);

  const handleStartChange = (date) => {
    setStart(startOfDay(date));
    if (isAfter(date, end)) {
      setEnd(endOfDay(date));
    }
  };
  const handleEndChange = (date) => {
    setEnd(endOfDay(date));
    if (isBefore(date, start)) {
      setStart(startOfDay(date));
    }
  };
  const handleMagnitudeCommit = (event, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setMagnitudeRange(newValue);
  };

  const { data, isLoading } = useFetchEarthquakes(start, end);
  const earthquakes = useMemo(() => {
    return {
      type: 'geojson',
      data: GeoJSON.parse(data?.length ? data : [], {
        Point: ['lat', 'lng'],
      }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Filter
        start={start}
        end={end}
        initialMagnitudeRange={magnitudeRange}
        handleStartChange={handleStartChange}
        handleEndChange={handleEndChange}
        handleMagnitudeCommit={handleMagnitudeCommit}
      />
      <Map
        earthquakes={earthquakes}
        isFetchingEarthquakes={isLoading}
        magnitudeRange={magnitudeRange}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
