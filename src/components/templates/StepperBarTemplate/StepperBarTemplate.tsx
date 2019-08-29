import React, { Component } from 'react';

import './StepperBarTemplate.scss';

import { ISidebar, ISideButtonsGroup } from '../../../types/side-bar';
import SidebarStepper from '../../molecules/SidebarStepper/SidebarStepper';

interface IProps {
  styles?: string[];
}
type TProps = IProps & ISidebar;

class StepperBarTemplate extends Component<TProps> {
  render() {
    const { sidebar, styles } = this.props;

    return (
      <div className="stepper-bar-template">
        <div className={this.getStepperBarClassName(styles)}>
          <SidebarStepper orientation="horizontal" buttons={this.getSidebarButtons(sidebar)} />
        </div>

        <div className="stepper-bar-template__body">{this.props.children}</div>
      </div>
    );
  }

  getStepperBarClassName(styles: string[] = []): string {
    const baseClass = 'stepper-bar-template__header';
    const classNames = styles.map(style => ` ${baseClass}--${style}`);
    return `${baseClass}${classNames.join('')}`;
  }

  getSidebarButtons(sidebar: ISideButtonsGroup) {
    return Object.keys(sidebar)
      .filter(key => {
        const btnProps = sidebar[key];
        return btnProps.className && btnProps.path;
      })
      .map(key => {
        return sidebar[key];
      });
  }
}

export default StepperBarTemplate;
