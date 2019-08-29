import React from 'react';
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper/Stepper';
import Step from '@material-ui/core/Step/Step';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';

import styles from './SidebarStepper.module.scss';

import { ISidebarButton } from '../../../types/side-bar';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import { resolvePath } from '../../../helpers/path';

interface IProps {
  buttons: ISidebarButton[];
  orientation: 'horizontal' | 'vertical';
}

const SidebarStepper: React.FC<IProps> = props => {
  return (
    <Stepper
      className={styles.stepper}
      nonLinear={true}
      activeStep={getActiveStep(props.buttons)}
      orientation={props.orientation}
    >
      {props.buttons.map((btn, index) => (
        <Step key={index} completed={btn.completed}>
          <StepLabel completed={btn.completed}>{getRowContent(btn)} </StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  function getActiveStep(buttons: ISidebarButton[]): number {
    let activeStep = 0;
    buttons.forEach((btn, index) => {
      if (btn.className === 'active') {
        activeStep = index;
      }
    });
    return activeStep;
  }

  function getRowContent(btn: ISidebarButton) {
    const translatedContent = <I18TextContainer textKey={btn.text} />;

    return btn.className !== 'disabled' && btn.path ? (
      <Link
        // set name and completed instead of TFOOTER
        className="link-button"
        to={resolvePath(btn.path)}
      >
        {translatedContent}
      </Link>
    ) : (
      translatedContent
    );
  }
};

export default SidebarStepper;
