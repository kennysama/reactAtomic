import React, { Component, ErrorInfo } from 'react';

import styles from './ErrorBoundary.module.scss';

import { IApiError } from '../../../types/api';
import { Nullable } from '../../../types';
import { getClientMessage } from '../../../helpers/message';
import Logger from '../../../helpers/logger';
import config from '../../../configuration/config';
import Button from '../../atoms/Button/Button';

type TProps = Error | {};

interface IState {
  hasError: boolean;
  error: Nullable<Error>;
  errorInfo: string;
}

const initialState: IState = {
  hasError: false,
  error: null,
  errorInfo: '',
};

class ErrorBoundary extends Component<TProps, IState> {
  get error(): IApiError {
    return getClientMessage('err', '0003', [this.state.errorInfo]);
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    if (config.isDev) {
      Logger.error('ErrorBoundary catched', error);
    }
    return { hasError: true };
  }

  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      errorInfo: errorInfo.componentStack,
      error,
    });
  }

  onClear = (): void => {
    this.setState({ ...initialState });
  };

  renderErrorMessage() {
    const { code, message } = this.error;
    const detail = config.isDev ? `${message}` : `${message}`;
    return (
      <div id={styles.container}>
        <div className={styles.wrapper}>
          <p>Errorが発生しました.</p>
          <p>{`code: ${code}`}</p>
          <textarea className={styles.textArea} value={detail} />
          <Button styles={['black', 'size-l']} onClick={this.onClear}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return this.renderErrorMessage();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
