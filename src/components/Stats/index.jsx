import Paper from '@mui/material/Paper';

import styles from './styles.module.css';

const Summary = () => {
  return (
    <Paper elevation={0} className={styles.stats}>
      <strong>Stats and Charts</strong>
      <p>insert statistics and charts here..</p>
    </Paper>
  );
};

export default Summary;
