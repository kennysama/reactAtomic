import React, { Component } from 'react';

import styles from './LoginPage.module.scss';

import * as fromStaff from '../../../store/staff';
import * as fromLanguage from '../../../store/language';

import IFrame from '../../atoms/IFrame/IFrame';
import InputText from '../../atoms/InputText/InputText';
import InputPassword from '../../atoms/InputPassword/InputPassword';
import Title from '../../atoms/Title/Title';
import I18TextContainer from '../../../containers/I18Text/I18Text';
import Button from '../../atoms/Button/Button';
import FlagSelector from '../../atoms/FlagSelector/FlagSelector';
import LoadingInfo from '../../molecules/LoadingInfo/LoadingInfo';
import ErrorDialog from '../../organisms/ErrorDialog/ErrorDialog';

import { ILoginReq } from '../../../types/login-api';
import { IApiError } from '../../../types/api';
import { ILookupItem } from '../../../types/lookup';
import { LANGUAGE_LOOKUPS } from '../../../lookups/language';

interface IProps {
  loggingIn: boolean;
  onLogin: typeof fromStaff.login;
  errorDialogOpen: boolean;
  errorDialogCloseHandler: typeof fromStaff.clearError;
  errors: IApiError[];
  selectedLanguage: ILookupItem;
  onChangeCurrentLanguage: typeof fromLanguage.loadLanguage;
}

type TState = ILoginReq;

const IFRAME_URL = '/information/index.html';

class LoginPage extends Component<IProps, TState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tempoCode: '',
      staffCode: '',
      password: '',
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* Flag */}
        <div className={styles.flag}>
          <FlagSelector
            name="radio buttons"
            data={LANGUAGE_LOOKUPS}
            checkedValue={String(this.props.selectedLanguage.id)}
            onValueChanged={this.props.onChangeCurrentLanguage}
          />
        </div>

        {/* Page */}
        <div className={styles.page}>
          <div className={styles.informationblock}>
            <div className={styles.logoblock}>
              <h1 className={styles.logo}>
                <img src="/images/logo.svg" alt="KASHIYAMA the Smart Tailor" />
              </h1>
              <p className={styles.message}>WELCOME</p>
            </div>
            <div className={styles.information}>
              <p className={styles.title}>INFORMATION</p>
              <div className={styles.iFrame}>
                <IFrame title="loginInfo" src={IFRAME_URL} />
              </div>
            </div>
          </div>
          <div className={styles.formblock}>
            <div className={styles.title}>
              <Title styles={['login']} title={this.getTextKey('title')} />
            </div>
            <div className={styles.message}>
              <p>
                <I18TextContainer textKey={this.getTextKey('description')} />
              </p>
            </div>
            <div className={styles.form}>
              <div className={styles.inputGroup}>
                <InputText
                  label={this.getTextKey('tempoCodeLabel')}
                  value={this.state.tempoCode}
                  onValueChanged={this.onChangeShopCode}
                  labelPosition={'TOP'}
                />
                <InputText
                  label={this.getTextKey('staffCodeLabel')}
                  value={this.state.staffCode}
                  onValueChanged={this.onChangeStaffCode}
                  labelPosition={'TOP'}
                />
                <InputPassword label={this.getTextKey('staffPasswordLabel')} onValueChanged={this.onChangePassword} />
              </div>
              <Button styles={['black', 'square', 'size-xl', 'center']} onClick={this.onLogin}>
                {this.getTextKey('loginButtonLabel')}
              </Button>
            </div>
          </div>
        </div>
        {this.renderUtility()}
      </React.Fragment>
    );
  }

  renderUtility() {
    return (
      <React.Fragment>
        {/* Loading */}
        <LoadingInfo
          isLoading={this.props.loggingIn}
          displayType="absolute"
          messageKey={this.getTextKey('loggingInMessage')}
        />

        {/* Dialog */}
        <ErrorDialog
          hasOpen={this.props.errorDialogOpen}
          onHandleClose={this.props.errorDialogCloseHandler}
          errors={this.props.errors}
        />
      </React.Fragment>
    );
  }

  getTextKey(key: string) {
    return `LoginPage.${key}`;
  }

  onChangeShopCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState({ tempoCode: value });
  };

  onChangeStaffCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState({ staffCode: value });
  };

  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    this.setState({ password: value });
  };

  onLogin = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const params = { ...this.state };
    this.props.onLogin(params);
  };

  // onApplyLatestSource = (event: React.MouseEvent<HTMLButtonElement>): void => {
  //   alert('If you have launched multiple tabs, other tabs will not reflect the update.');
  //   serviceWorker.unregister();
  // };
}

export default LoginPage;
