import { History } from 'history';

import { resolvePath } from './path';
import { ERouterPath } from '../types';
import * as fromOrderConfirmation from '../store/order-confirmation';
import * as fromDialog from '../store/dialog';
import { createOkCancelDialogData } from './dialog';

export function homeCancelBtnFn(
  history: History,
  clearItemSteps: typeof fromOrderConfirmation.clearItemSteps,
  showOkCancelDialog: typeof fromDialog.showOkCancelDialog,
): () => void {
  const callbackFn = () => {
    // FIXME: Transrate.
    const title = '確認';
    const contents = '作業を中止してホームに戻りますか？';
    const okFn = () => {
      history.push(resolvePath(ERouterPath.home));
      clearItemSteps();
    };

    const data = createOkCancelDialogData(contents, title, false, okFn);
    showOkCancelDialog(data);
  };

  return callbackFn;
}

export function saveBtnFn(createNewItem: typeof fromOrderConfirmation.createNewItem): () => void {
  const callbackFn = () => {
    createNewItem();
  };
  return callbackFn;
}
