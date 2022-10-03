import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { startOfYear, endOfYear } from 'date-fns';
import RangeSlider from 'components/custom/RangeSlider';

import styles from './styles.module.css';

const Filter = ({
  start,
  end,
  initialMagnitudeRange,
  handleStartChange,
  handleEndChange,
  handleMagnitudeCommit,
}) => {
  return (
    <Paper elevation={0} className={styles.filter}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileDatePicker
            label='Start Date'
            value={start}
            onChange={handleStartChange}
            closeOnSelect
            minDate={startOfYear(
              new Date(process.env.REACT_APP_CALENDAR_MIN_YEAR)
            )}
            maxDate={endOfYear(Date.now())}
            disableFuture
            renderInput={(params) => (
              <TextField {...params} variant='standard' />
            )}
          />
          <MobileDatePicker
            label='End Date'
            value={end}
            onChange={handleEndChange}
            closeOnSelect
            minDate={startOfYear(
              new Date(process.env.REACT_APP_CALENDAR_MIN_YEAR)
            )}
            maxDate={endOfYear(Date.now())}
            disableFuture
            renderInput={(params) => (
              <TextField {...params} variant='standard' />
            )}
          />
          <RangeSlider
            label='Magnitude'
            initialRange={initialMagnitudeRange}
            handleOnChangeCommit={handleMagnitudeCommit}
          />
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
};

export default Filter;
