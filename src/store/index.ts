import { createStore, combineReducers, applyMiddleware, compose, StoreCreator } from 'redux';
import thunk from 'redux-thunk';

import * as fromStaff from './staff';
import * as fromCustomer from './customer';
import * as fromLanguage from './language';
import * as fromNavigation from './navigation';

import * as fromDigestsSearch from './ordersDigestsSearch';
import * as fromPrivacyPolicy from './privacyPolicy';
import * as fromDesignSelection from './design-selection';
import * as fromClothSelection from './clothSelection';
import * as fromSizeCorrection from './size-correction';
import * as fromDialog from './dialog';
import * as fromOrderConfirmation from './order-confirmation';
import * as fromHome from './home';
import * as fromHeader from './header';
import * as fromAddress from './address';

const reducers = {
  staffFeature: fromStaff.reducers,
  customerFeature: fromCustomer.reducers,
  language: fromLanguage.reducers,
  navigation: fromNavigation.reducers,
  languageState: fromLanguage.reducers,
  ordersDigests: fromDigestsSearch.reducers,
  clothSelection: fromClothSelection.reducers,
  privacyPolicy: fromPrivacyPolicy.reducers,
  designSelection: fromDesignSelection.reducers,
  sizeCorrection: fromSizeCorrection.reducers,
  dialog: fromDialog.reducers,
  orderConfirmation: fromOrderConfirmation.reducers,
  home: fromHome.reducers,
  header: fromHeader.reducers,
  address: fromAddress.reducers,
};

const rootReducer = combineReducers(reducers);
export type AppState = ReturnType<typeof rootReducer>;

const enhancers = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
);

export function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancers);
}
