import React from 'react';
import Label from '../../../atoms/Label/Label';

import styles from './DesignSelectionResume.module.scss';

interface IProps {
  sampleA?: string;
  sampleB?: string;
}

const DesignSelectionResume: React.FC<IProps> = ({ sampleA = 'property 1 value', sampleB = 'property 2 value' }) => (
  <div className={styles.temp}>
    <label>Design Selection Resume Component</label>
    <br /> <br />
    <Label text="prop1" />
    <Label text={sampleA} />
    <br />
    <Label text="prop2" />
    <Label text={sampleB} />
    <br />
    <br />
    <br />
  </div>
);

export default DesignSelectionResume;
