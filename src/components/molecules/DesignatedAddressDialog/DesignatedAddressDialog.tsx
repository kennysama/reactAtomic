import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon/Icon';

import styles from './DesignatedAddressDialog.module.scss';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import Button from '../../atoms/Button/Button';
import { getDesignatedAddress, TOrderDestination } from '../../../types/designated-address';

interface IProps {
  onSave: (obj: TOrderDestination) => void;
  onCancel: () => void;
  open: boolean;
}
interface IState {
  expandedElement: string;
  inputBtnDisabled: boolean;
  orderDestination: TOrderDestination;
}

class DesignatedAddressDialog extends Component<IProps, IState> {
  private translate = 'designatedAddressDialog.';
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputBtnDisabled: true,
      expandedElement: '',

      orderDestination: {
        shippingStore: '',
        shippingPostalCodeLeft: '',
        shippingPostalCodeRight: '',
        shippingCity: '',
        shippingResidence: '',
        shippingState: '',
        shippingPhoneNumberPartOne: '',
        shippingPhoneNumberPartTwo: '',
        shippingPhoneNumberPartThree: '',
        shippingPhoneNumberTwoPartOne: '',
        shippingPhoneNumberTwoPartTwo: '',
        shippingPhoneNumberTwoPartThree: '',
        emailPartOne: '',
        emailPartTwo: '',
        name: '',
      },
    };
  }
  render() {
    return (
      <React.Fragment>
        <Dialog scroll={'paper'} maxWidth={'xl'} open={this.props.open} onClose={this.handleSave}>
          <DialogContent className={styles.designatedAddressDialog}>
            <div className={styles.left}>
              {getDesignatedAddress().map((group, groupIndex) => (
                <div key={groupIndex}>
                  <ExpansionPanel
                    expanded={this.state.expandedElement === group.name}
                    onClick={this.handleExpandedClick.bind(this, group.name)}
                  >
                    <ExpansionPanelSummary className={styles.header}>
                      <Icon>{'arrow_drop_down'}</Icon>
                      <Typography className={styles.title}>{group.name}</Typography>
                    </ExpansionPanelSummary>
                    {group.content.map((designatedAddress, addressIndex) => {
                      return (
                        <ExpansionPanelDetails
                          onClick={this.handleContentClick.bind(this, designatedAddress)}
                          key={addressIndex}
                          className={styles.content}
                        >
                          {designatedAddress.shippingStore}
                        </ExpansionPanelDetails>
                      );
                    })}
                  </ExpansionPanel>
                </div>
              ))}
            </div>

            <div className={styles.right}>
              <div className={styles.content}>
                {this.state.orderDestination.shippingStore === '' ? (
                  <I18TextContainer textKey={this.translate + 'dialogTitle'} />
                ) : (
                  <div>
                    {this.state.orderDestination.shippingStore}
                    <br />
                    <p>
                      〒{this.state.orderDestination.shippingPostalCodeLeft} -{' '}
                      {this.state.orderDestination.shippingPostalCodeRight}
                      <br />
                      {this.state.orderDestination.shippingResidence} {this.state.orderDestination.shippingStore}
                      <br />
                      {this.state.orderDestination.shippingPhoneNumberPartOne} -{' '}
                      {this.state.orderDestination.shippingPhoneNumberPartTwo} -{' '}
                      {this.state.orderDestination.shippingPhoneNumberPartThree}
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <Button onClick={this.props.onCancel}>{this.translate + 'cancelBtn'}</Button>
                <Button disabled={this.state.inputBtnDisabled} onClick={this.handleSave}>
                  {this.translate + 'inputBtn'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }

  handleExpandedClick = (groupName: string) => {
    this.setState({ expandedElement: groupName });
  };

  handleContentClick = (designatedAddress: TOrderDestination, event: any) => {
    this.setState({ inputBtnDisabled: false, orderDestination: { ...designatedAddress } });
  };

  handleSave = () => {
    this.props.onSave(this.state.orderDestination);
  };
}

export default DesignatedAddressDialog;
