import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { startOfYear, endOfYear } from 'date-fns';

import styles from './styles.module.css';

const Filter = ({
  start,
  end,
  initialMagnitudeRange,
  handleStartChange,
  handleEndChange,
  handleMagnitudeCommit,
}) => {
  const [magnitudeRange, setMagnitudeRange] = useState(initialMagnitudeRange);
  const handleMagnitudeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const minDistance = 0.1;
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10 - minDistance);
        setMagnitudeRange([clamped, +(clamped + minDistance).toFixed(1)]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setMagnitudeRange([+(clamped - minDistance).toFixed(1), clamped]);
      }
    } else {
      setMagnitudeRange(newValue);
    }
  };

  return (
    <Paper elevation={0} className={styles.container}>
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
          <FormControl>
            <Typography variant='caption' color='primary'>
              {`Magnitude (
              ${magnitudeRange[0].toFixed(1)} - ${magnitudeRange[1].toFixed(1)}
              )`}
            </Typography>
            <Box sx={{ marginTop: 1 }}>
              <Slider
                value={magnitudeRange}
                onChange={handleMagnitudeChange}
                onChangeCommitted={handleMagnitudeCommit}
                disableSwap
                min={0}
                max={10}
                step={0.1}
              />
            </Box>
          </FormControl>
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
};

export default Filter;
