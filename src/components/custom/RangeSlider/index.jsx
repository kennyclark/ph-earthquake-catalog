import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const RangeSlider = ({
  min = 0,
  max = 10,
  step = 0.1,
  // minDistance = 0.1, // NOTE: Uncomment this line if using minimum distance
  label,
  unit = '',
  initialRange,
  handleOnChangeCommit,
}) => {
  const [range, setRange] = useState(initialRange);
  const handleChange = (_event, newValue, _activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    // NOTE: Uncomment this block if using minimum distance
    // if (newValue[1] - newValue[0] < minDistance) {
    //   if (activeThumb === 0) {
    //     const clamped = Math.min(newValue[0], 10 - minDistance);
    //     setRange([clamped, +(clamped + minDistance).toFixed(1)]);
    //   } else {
    //     const clamped = Math.max(newValue[1], minDistance);
    //     setRange([+(clamped - minDistance).toFixed(1), clamped]);
    //   }
    // } else {
    //   setRange(newValue);
    // }

    // NOTE: Comment next line if using minimum distance
    setRange(newValue);
  };
  return (
    <FormControl>
      <FormLabel>
        <Typography
          variant='caption'
          id={`${label.toLowerCase()}-range-slider`}
        >
          {`${label} (
          ${range[0].toFixed(1)} - ${range[1].toFixed(1)} ${unit}
          )`}
        </Typography>
      </FormLabel>
      <Slider
        value={range}
        onChange={handleChange}
        onChangeCommitted={handleOnChangeCommit}
        min={min}
        max={max}
        step={step}
        aria-labelledby={`${label.toLowerCase()}-range-slider`}
      />
    </FormControl>
  );
};

export default RangeSlider;
