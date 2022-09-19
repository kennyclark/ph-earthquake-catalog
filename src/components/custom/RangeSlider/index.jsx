import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const RangeSlider = ({
  min = 0,
  max = 10,
  step = 0.1,
  minDistance = 0.1,
  label,
  unit = '',
  initialRange,
  handleOnChangeCommit,
}) => {
  const [range, setRange] = useState(initialRange);
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10 - minDistance);
        setRange([clamped, +(clamped + minDistance).toFixed(1)]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setRange([+(clamped - minDistance).toFixed(1), clamped]);
      }
    } else {
      setRange(newValue);
    }
  };
  return (
    <FormControl>
      <Typography variant='caption' color='primary'>
        {`${label} (
        ${range[0].toFixed(1)} - ${range[1].toFixed(1)} ${unit}
        )`}
      </Typography>
      <Box>
        <Slider
          value={range}
          onChange={handleChange}
          onChangeCommitted={handleOnChangeCommit}
          disableSwap
          min={min}
          max={max}
          step={step}
        />
      </Box>
    </FormControl>
  );
};

export default RangeSlider;
