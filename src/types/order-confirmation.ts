import { IHomeParams } from './home';
import { IClothSelection } from './cloth-selection';
import { IDesignSelectionState } from '../store/design-selection/reducer';
import { ISizeCorrectionState } from '../store/size-correction/reducer';

export interface IOrderConfirmation {
  orderConfirmationItemId: number;
  isTemporal: boolean;
  home: IHomeParams;
  // Cloth Selection: now working with only data fields
  clothSelection: IClothSelection;
  //
  //
  // save full state by now maybe in the future can save only data fields
  designSelection: IDesignSelectionState;

  // save full state to avoid errors if the actual mock state changes.
  sizeCorrection: ISizeCorrectionState;
  //
}
