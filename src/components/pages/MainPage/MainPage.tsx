import React, { Component } from 'react';
import PropTypes from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './MainPage.module.scss';

import { ERouterPath } from '../../../types/index';
import Title from '../../atoms/Title/Title';
import LinkButton from '../../molecules/LinkButton/LinkButton';
import InputKeyboard from '../../molecules/InputKeyboard/InputKeyboard';
import ItemList, { IListItem } from '../../molecules/ItemList/ItemList';
import InputText from '../../atoms/InputText/InputText';
import NumericInput from '../../molecules/NumericInput/NumericInput';
import Tab, { ITab } from '../../molecules/Tab/Tab';
import Button from '../../atoms/Button/Button';

interface IState {
  isInvisible: boolean;
  tooltipText: string;
  height: number;
  displaySampleTabValue: string;
  displayMainTabValue: string;
  hasError: boolean;
}

class MainPage extends Component<{}, IState> {
  private timer: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      isInvisible: false,
      tooltipText: 'tooltip text',
      height: 160,
      displaySampleTabValue: sampleTabs[0].value,
      displayMainTabValue: '1',
      hasError: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ isInvisible: !this.state.isInvisible });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (this.state.hasError) {
      throw Error('Main Page Component Clashed!');
    }

    const mainTabs = getMainTabs([
      <ItemList key="1" title="Move to Another Page" items={this.getMoveToAnotherPageItems()} />,
      <ItemList key="2" title="Sample Component Page" items={this.getSampleComponentPageItems()} />,
      <ItemList key="3" title="Try Sample Component" items={this.getSampleDisplayComponent()} />,
      <ItemList key="4" title="Materila-ui Component Sample" items={this.getSampleMaterialComponent()} />,
    ]);

    return (
      <div className={styles.mainPage}>
        <Title title={getTextKey('pageTitle')} />
        <Tab tabs={mainTabs} currentValue={this.state.displayMainTabValue} onHandleChanged={this.handleChangeMainTab} />
      </div>
    );
  }

  onClickError = () => {
    this.setState({ hasError: true });
  };

  getMoveToAnotherPageItems(): IListItem[] {
    const items: IListItem[] = [
      {
        key: 'home',
        left: <p>Move to Home Page</p>,
        right: <LinkButton to={ERouterPath.home} label="HOME" />,
      },
      {
        key: 'order',
        left: <p>Move to Orders Page</p>,
        right: <LinkButton to={ERouterPath.address} label={getTextKey('order')} />,
      },
      {
        key: 'order_search',
        left: <p>Move to OrderSearch Page</p>,
        right: <LinkButton to={ERouterPath.ordersSearch} label={getTextKey('orderSearchButtonLabel')} />,
      },
    ];
    return items;
  }

  getSampleComponentPageItems(): IListItem[] {
    const items: IListItem[] = [
      {
        key: 'pie_chart',
        left: <p>Let's check PieChart Sample</p>,
        right: <LinkButton to={ERouterPath.pieChart} label={'pie'} />,
      },
      {
        key: 'dialog',
        left: <p>Let's check Dialog Sample</p>,
        right: <LinkButton to={ERouterPath.dialog} label={getTextKey('dialogButtonLabel')} />,
      },
    ];
    return items;
  }

  getSampleDisplayComponent(): IListItem[] {
    const { displaySampleTabValue: displayTabValue } = this.state;
    return [
      {
        key: 'Error Boundary Test',
        left: <p>Let's try Error Boundary!</p>,
        right: <Button onClick={this.onClickError}> Error Boundary! </Button>,
      },
      {
        key: 'numberic_input',
        left: <p>Let's try Numberic Input Keyboard!</p>,
        right: <InputKeyboard onInputChange={this.inputChangeHandler} placeholder="Test Numberic Input Keyboard" />,
      },
      {
        key: 'numeric',
        left: <p>Let's try Numberic Input Keyboard!</p>,
        right: (
          <NumericInput
            value={this.state.height}
            onValueChanged={this.handleChangeInput}
            max={190}
            min={150}
            step={0.5}
          />
        ),
      },
      {
        key: 'tab',
        left: <p>Let's try Sample Tab.</p>,
        right: (
          <div className={styles.toolTipWrapper}>
            <Tab tabs={sampleTabs} currentValue={displayTabValue} onHandleChanged={this.handleChangeSampleTab} />
          </div>
        ),
      },
    ];
  }

  getSampleMaterialComponent(): IListItem[] {
    return [
      {
        key: 'badge',
        left: <a href="https://material-ui.com/demos/badges/">Go material-ui badge sample page</a>,
        right: (
          <React.Fragment>
            <Badge badgeContent={10} max={9} color="primary" className={styles.badge}>
              <Icon>shopping_orderConfirmation</Icon>
            </Badge>
            <Badge badgeContent={99} color="primary" className={styles.badge}>
              <Icon>shopping_orderConfirmation</Icon>
            </Badge>
            <Badge badgeContent={100} color="secondary" className={styles.badge}>
              <Icon>shopping_orderConfirmation</Icon>
            </Badge>
            <Badge color="secondary" variant="dot" className={styles.badge}>
              <Icon>mail</Icon>
            </Badge>
            <Badge color="secondary" badgeContent={4} invisible={this.state.isInvisible} className={styles.badge}>
              <Icon>mail</Icon>
            </Badge>
            <Badge badgeContent={2} color="error" className={styles.badge}>
              <LinkButton to={ERouterPath.address} label={getTextKey('order')} />
            </Badge>
          </React.Fragment>
        ),
      },
      {
        key: 'chops',
        left: <a href="https://material-ui.com/demos/chips/">Go material-ui chops sample page</a>,
        right: (
          <React.Fragment>
            {chops.map((chop, index) => {
              return index !== 2 ? (
                <Chip key={chop.label} color={chop.color} label={chop.label} className={styles.chop} />
              ) : (
                <Chip
                  className={styles.chop}
                  key={chop.label}
                  color={chop.color}
                  label={chop.label}
                  onDelete={this.handleDelete(chop.label)}
                />
              );
            })}
          </React.Fragment>
        ),
      },
      {
        key: 'tooltips',
        left: <a href="https://material-ui.com/demos/tooltips/">Go material-ui tooltips sample page</a>,
        right: (
          <div className={styles.toolTipWrapper}>
            <div className={styles.text}>
              <InputText value={this.state.tooltipText} onValueChanged={this.handleChangeTooltipText} />
            </div>
            <div className={styles.tooltip}>
              <Tooltip title={this.state.tooltipText} placement="right">
                <div className={styles.item}>
                  <Icon>touch_app</Icon>
                  <p>hover me</p>
                </div>
              </Tooltip>
            </div>
          </div>
        ),
      },
    ];
  }

  inputChangeHandler(value: string) {
    alert(`your input Numberic input is ${value}`);
  }

  handleChangeTooltipText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState({ tooltipText: value });
  };

  handleDelete = (itemName: string) => (event: any) => {
    alert(`delete ${itemName}`);
  };

  handleChangeInput = (value: number) => {
    this.setState({ height: value });
  };

  handleChangeMainTab = (value: string) => {
    this.setState({ displayMainTabValue: value });
  };

  handleChangeSampleTab = (value: string) => {
    this.setState({ displaySampleTabValue: value });
  };
}

interface IChop {
  label: string;
  color: PropTypes.PropTypes.Color;
}

const colors: PropTypes.PropTypes.Color[] = ['primary', 'secondary', 'default'];
const chops = [...Array(5)].map((value, index) => {
  const ret: IChop = {
    label: `chop ${index + 1}`,
    color: colors[index % 3],
  };
  return ret;
});

function getTextKey(key: string) {
  return `MainPage.${key}`;
}

function getMainTabs(items: React.ReactNode[]): ITab[] {
  return [
    {
      value: '1',
      label: 'Move to Another Page',
      container: items[0],
    },
    {
      value: '2',
      label: 'Sample Component Page',
      container: items[1],
    },
    {
      value: '3',
      label: 'Try Sample Component',
      container: items[2],
    },
    {
      value: '4',
      label: 'Materila-ui Component Sample',
      container: items[3],
    },
  ];
}

const sampleTabs: ITab[] = [
  {
    value: '1',
    label: 'ジャケット',
    container: <div>ジャケットに関するコンポーネントが入ります</div>,
  },
  {
    value: '2',
    label: 'トラウザーズ 1/2',
    container: <div>トラウザーズ 1/2に関するコンポーネントが入ります</div>,
  },
  {
    value: '3',
    label: 'トラウザーズ 2/2',
    container: <div>トラウザーズ 2/2に関するコンポーネントが入ります</div>,
  },
  {
    value: '4',
    label: 'ベスト',
    container: <div>ベストに関するコンポーネントが入ります</div>,
  },
];

export default MainPage;
