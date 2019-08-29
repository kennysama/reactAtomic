import React from 'react';

// import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Spinner.module.scss';

interface IProps {
  isLoading?: boolean;
}

const Spinner: React.FC<IProps> = ({ isLoading }) => {
  return (
    <div className={isLoading ? styles.isLoading : styles.spinner}>
      {/* <CircularProgress />*/}
      <img src="/images/common/img-loading.svg" alt="loading" />
    </div>
  );
};

export default Spinner;
