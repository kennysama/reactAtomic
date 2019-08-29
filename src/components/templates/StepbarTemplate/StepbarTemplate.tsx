import React, { Component } from 'react';

import styles from './StepbarTemplate.module.scss';
import Stepbar from '../../molecules/Stepbar/Stepbar';
import { IStepbar } from '../../../types/stepbar';

interface IProps {
  stepbar: IStepbar;
}

class StepbarTemplate extends Component<IProps> {
  render() {
    const { currentPath, steps } = this.props.stepbar;

    return (
      <div id={styles.page}>
        <div className={styles.stepbar}>
          <Stepbar currentPath={currentPath} steps={steps} />
        </div>
        <div className={styles.contents}>{this.props.children}</div>
      </div>
    );
  }
}

export default StepbarTemplate;
