import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import styles from './HomePage.module.scss';
import HomeImageGallery from '../../organisms/HomeImageGallery/HomeImageGallery';
import OrderClassification from '../../molecules/OrderClassification/OrderClassification';
import * as fromHome from '../../../store/home';
import * as fromOrderConfirmation from '../../../store/order-confirmation';
import { getGalleryData } from '../../../lookups/home-gallery';
import LinkButton from '../../molecules/LinkButton/LinkButton';
import { ERouterPath } from '../../../types';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';

interface IProps {
  clothSelectionParameters: typeof fromHome.loadHomeParameters;
  hasTemporalOrderItem: boolean;
  hasSavedOrders: boolean;
  loadTemporaryOrderItem: typeof fromOrderConfirmation.editOrderConfirmationItem;
}
interface IState {
  temporaryOnePiecePopUp: boolean;
}

type TProps = IProps & RouteComponentProps;

export class HomePage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { temporaryOnePiecePopUp: false };
  }
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <div className={styles.header}>
          <OrderClassification />
          {this.temporalButtonLoadSaveOrder()}
        </div>

        <div className={styles.gallery}>
          <HomeImageGallery
            clothSelectionParameters={props.clothSelectionParameters}
            temporaryOnePiecePopUp={this.state.temporaryOnePiecePopUp}
            data={getGalleryData()}
            temporaryOnePiecePopUpOpen={this.temporaryOnePiecePopUpOpen}
          />
        </div>
        {this.utility(props)}
      </React.Fragment>
    );
  }
  temporaryOnePiecePopUpOpen = (flag: boolean) => {
    this.setState({ temporaryOnePiecePopUp: flag });
  };

  temporalButtonLoadSaveOrder = () =>
    this.props.hasTemporalOrderItem ? (
      <div
        className={styles.temporalRemoveAfterFuruyaSan}
        onClick={this.props.loadTemporaryOrderItem.bind(this.props.loadTemporaryOrderItem, 0)}
      >
        <LinkButton
          to={ERouterPath.clothSelection}
          label={` ------ 一時的な場所 ------------------------------ 注文を続ける --------------- `}
        />
      </div>
    ) : null;

  getFooterButtons(props: TProps): IFooterButton[] {
    return [
      {
        type: 'confirm',
        isDisabled: !props.hasSavedOrders,
        path: ERouterPath.orderConfirmation,
      },
    ];
  }

  utility = (props: TProps) => {
    return (
      <React.Fragment>
        <FunctionFooter buttons={this.getFooterButtons(props)} />
      </React.Fragment>
    );
  };
}

export default withRouter(HomePage);
