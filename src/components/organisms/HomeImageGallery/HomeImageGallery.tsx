import React from 'react';

import styles from './HomeImageGallery.module.scss';

import * as fromHome from '../../../store/home';

import I18TextContainer from '../../../containers/I18Text/I18Text';
import LinkButton from '../../molecules/LinkButton/LinkButton';

import { IImageGallery, IImageGalleryButton } from '../../../types/home';
import HomeGalleryPopUp from '../../molecules/HomeGalleryPopUp/HomeGalleryPopUp';
import { ERouterPath } from '../../../types';

interface IProps {
  data: IImageGallery[];
  clothSelectionParameters: typeof fromHome.loadHomeParameters;
  temporaryOnePiecePopUp: boolean;
  temporaryOnePiecePopUpOpen: (flag: boolean) => any;
}

const HomeImageGallery: React.FC<IProps> = props => {
  return (
    <div className={styles.homeImageGallery}>
      {props.data.map(topic => {
        return (
          <div key={topic.key} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.title}>
                <I18TextContainer textKey={topic.title} />
              </div>
              <div className={styles.image}>
                <img src={topic.url} alt={topic.title} />
              </div>
            </div>
            <div className={styles.buttonBlock}>
              {topic.buttons.map(button => {
                // temporary if category 10 open popup dialog.
                if (button.subCategory === '10') {
                  return temporaryOnePeacePopUpButton(button);
                }
                // end temporary
                return (
                  <div
                    onClick={props.clothSelectionParameters.bind(props.clothSelectionParameters, {
                      category: button.category,
                      subCategory: button.subCategory,
                    })}
                    key={button.key}
                    className={styles.button}
                  >
                    <LinkButton styles={['black', 'size-l', 'block']} to={button.to} label={button.text} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
  function temporaryOnePeacePopUpButton(button: IImageGalleryButton) {
    return (
      <div key={button.key}>
        <div
          onClick={props.temporaryOnePiecePopUpOpen.bind(props.temporaryOnePiecePopUpOpen, true)}
          key={button.key}
          className={styles.button}
        >
          <LinkButton styles={['black', 'size-l', 'block']} to={ERouterPath.home} label={button.text} />
        </div>
        <HomeGalleryPopUp
          clothSelectionParameters={props.clothSelectionParameters}
          button={button}
          onCancel={props.temporaryOnePiecePopUpOpen.bind(props.temporaryOnePiecePopUpOpen, false)}
          open={props.temporaryOnePiecePopUp}
        />
      </div>
    );
  }
};

export default HomeImageGallery;
