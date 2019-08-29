import React from 'react';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';

import * as fromHome from '../../../store/home';

import styles from './HomeGalleryPopUp.module.scss';

import Button from '../../atoms/Button/Button';
import { IImageGalleryButton } from '../../../types/home';
import LinkButton from '../LinkButton/LinkButton';
import { TSubCategory } from '../../../types/order-items';
import Title from '../../atoms/Title/Title';

interface IProps {
  clothSelectionParameters: typeof fromHome.loadHomeParameters;
  onCancel: () => void;
  open: boolean;
  button: IImageGalleryButton;
}

const HomeGalleryPopUp: React.FC<IProps> = props => {
  return (
    <Dialog scroll={'paper'} maxWidth={'xl'} open={props.open} onClose={props.onCancel}>
      <DialogContent className={styles.homeGalleryPopUp}>
        <Title title={'ワンピース'} />
        <div className={styles.bottom}>
          <div onClick={handleSave.bind(handleSave, '13')}>
            <LinkButton styles={['white']} to={props.button.to} label="ジャケットあり" />
          </div>
          <div onClick={handleSave.bind(handleSave, '14')}>
            <LinkButton styles={['white']} to={props.button.to} label="ジャケット無し" />
          </div>
          <div>
            <Button styles={['block']} onClick={props.onCancel}>
              キャンセル
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  function handleSave(subCategory: TSubCategory) {
    props.clothSelectionParameters({ category: props.button.category, subCategory });
  }
};

export default HomeGalleryPopUp;
