import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import MaterialTab from '@material-ui/core/Tab';

import './Tab.scss';

export interface ITab {
  value: string;
  label: string;
  container: React.ReactNode;
}

interface IProps {
  tabs: ITab[];
  currentValue: string;
  onHandleChanged: (value: string) => void;
}

class Tab extends Component<IProps, {}> {
  render() {
    const { currentValue } = this.props;

    return (
      <React.Fragment>
        <AppBar className="tabbar" position="static" color="default">
          <Tabs
            className="tabbar__wrapper"
            value={currentValue}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {this.renderTabs()}
          </Tabs>
        </AppBar>
        {this.renderTabContainer()}
      </React.Fragment>
    );
  }

  renderTabs() {
    return this.props.tabs.map((tab, index) => {
      return (
        <MaterialTab className={this.getTabClassName(tab.value)} key={index} value={tab.value} label={tab.label} />
      );
    });
  }

  renderTabContainer() {
    const selectedTab = this.selectedTab;
    return selectedTab !== null ? selectedTab.container : null;
  }

  get selectedTab() {
    const tabs = this.props.tabs.filter(tab => {
      return tab.value === this.props.currentValue;
    });

    if (tabs.length < 1) {
      return null;
    }

    return tabs[0];
  }

  get selectedTabValue() {
    const selectedTab = this.selectedTab;
    return selectedTab !== null ? selectedTab.value : '';
  }

  getTabClassName(value: string) {
    const classes = ['tabbar__wrapper__tab'];
    if (value === this.selectedTabValue) {
      classes.push('--selected');
    }

    return classes.join('');
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    this.props.onHandleChanged(newValue);
  };
}

export default Tab;
