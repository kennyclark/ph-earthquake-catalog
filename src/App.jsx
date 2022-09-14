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

  const { data } = useFetchEarthquakes(start, end);
  const earthquakes = useMemo(() => {
    return {
      type: 'geojson',
      data: GeoJSON.parse(data?.length ? data : [], { Point: ['lat', 'lng'] }),
    };
  }, [data]);

  return (
    <>
      <Filter
        start={start}
        end={end}
        handleStartChange={handleStartChange}
        handleEndChange={handleEndChange}
      />
      <Map earthquakes={earthquakes} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
