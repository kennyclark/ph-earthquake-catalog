import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { subWeeks, isBefore, isAfter } from 'date-fns';

import styles from './styles.module.css';

const Filter = () => {
  const [end, setEnd] = useState(Date.now())
  const [start, setStart] = useState(subWeeks(end, 1));

  const handleStartChange = (date) => {
    if(isAfter(date, end)) {
      setEnd(date);
    }
    setStart(date);
  };
  const handleEndChange = (date) => {
    if(isBefore(date, start)) {
      setStart(date);
    }
    setEnd(date);
  };

  return (
    <Paper elevation={0} className={styles.container}>    
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="Start Date"
            value={start}
            onChange={handleStartChange}
            closeOnSelect
            disableFuture
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="End Date"
            value={end}
            onChange={handleEndChange}
            closeOnSelect
            disableFuture
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
}

export default Filter;