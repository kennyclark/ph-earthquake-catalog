import { useState } from 'react';
import { subWeeks, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import { Sidebar } from 'Layout';
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

  const { data: earthquakes, isLoading } = useFetchEarthquakes(start, end);

  return (
    <>
      <Sidebar>
        <Filter
          start={start}
          end={end}
          initialMagnitudeRange={magnitudeRange}
          handleStartChange={handleStartChange}
          handleEndChange={handleEndChange}
          handleMagnitudeCommit={handleMagnitudeCommit}
        />
      </Sidebar>
      <Map
        earthquakes={earthquakes}
        isFetchingEarthquakes={isLoading}
        dateRange={{ start, end }}
        magnitudeRange={magnitudeRange}
      />
    </>
  );
};

export default App;
