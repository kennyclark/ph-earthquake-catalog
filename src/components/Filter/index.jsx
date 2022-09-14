import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import styles from './styles.module.css';

const Filter = ({ start, end, handleStartChange, handleEndChange }) => {
  return (
    <Paper elevation={0} className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileDatePicker
            label='Start Date'
            value={start}
            onChange={handleStartChange}
            closeOnSelect
            disableFuture
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label='End Date'
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
};

export default Filter;
