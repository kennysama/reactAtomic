import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import styles from './Stepbar.module.scss';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import { resolvePath } from '../../../helpers/path';
import { IStep } from '../../../types/stepbar';

export interface IProps {
  currentPath: string;
  steps: IStep[];
}

type TProps = IProps & RouteComponentProps;

const Stepbar: React.FC<TProps> = (props: TProps) => {
  const getIsDisabled = (step: IStep): boolean => {
    const isDisabled = typeof step.isDisabled !== 'undefined' ? step.isDisabled : true;
    return isDisabled;
  };

  const isCurrent = (step: IStep): boolean => {
    const { currentPath } = props;
    return currentPath === resolvePath(step.path);
  };

  const getClassName = (step: IStep, isDisabled: boolean): string => {
    const baseClasses = [styles.label];
    if (isCurrent(step)) {
      baseClasses.push(styles.active);
    }
    if (isDisabled) {
      baseClasses.push(styles.disabled);
    }
    return baseClasses.join(' ');
  };

  const onClick = (step: IStep, isDisabled: boolean) => () => {
    if (isDisabled) {
      return;
    }
    if (step.onClick) {
      step.onClick();
    }
    props.history.push(resolvePath(step.path));
  };

  const renderLabel = (step: IStep) => {
    const isDisabled = getIsDisabled(step);
    return (
      <div key={step.order} className={getClassName(step, isDisabled)} onClick={onClick(step, isDisabled)}>
        <p>
          <I18TextContainer textKey={step.textkey} />
        </p>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div id={styles.container}>{props.steps.map(v => renderLabel(v))}</div>
    </React.Fragment>
  );
};

export default withRouter(Stepbar);
