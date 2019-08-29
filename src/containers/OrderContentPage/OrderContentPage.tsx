import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderContentPage from '../../components/pages/OrderContentPage/OrderContentPage';

class OrderContentPageContainer extends Component<{}> {
  render() {
    return <OrderContentPage  />;
  }
}

export default connect()(OrderContentPageContainer);
