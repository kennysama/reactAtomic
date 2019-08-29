import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import styles from './PrivacyPolicyPage.module.scss';
import Title from '../../atoms/Title/Title';
import CheckBox from '../../atoms/CheckBox/CheckBox';
import Button from '../../atoms/Button/Button';

import * as fromPrivacyPolicy from '../../../store/privacyPolicy';

import LinkButton from '../../molecules/LinkButton/LinkButton';
import { ERouterPath } from '../../../types';
import FunctionFooter from '../../organisms/FunctionFooter/FunctionFooter';
import { IFooterButtonNew as IFooterButton } from '../../../types/footer';

interface IProps {
  conditionOne: boolean;
  conditionTwo: boolean;
  privacyPolicyAccepted: boolean;
  conditionOneChangeHandler: typeof fromPrivacyPolicy.conditionOneHandler;
  conditionTwoChangeHandler: typeof fromPrivacyPolicy.conditionTwoHandler;
  acceptBtn: typeof fromPrivacyPolicy.PrivacyPolicyAccepted;
  rejectBtn: () => void;
}

type TProps = IProps & RouteComponentProps;

const PrivacyPolicyPage: React.FC<TProps> = props => {
  return (
    <React.Fragment>
      <div className={styles.privacyPolicy}>
        <div className={styles.header}>
          <Title title="Privacy Policy" styles={['white']} />
        </div>
        <div className={styles.textContent}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae totam eos nisi impedit quos! Animi temporibus
          ratione, facilis sequi molestiae dignissimos amet nisi totam iusto iste doloremque aut, vel ipsum?
        </div>
        <div className={styles.center}>
          <CheckBox
            styles={['black', 'large']}
            onChange={conditionOneHandler}
            checked={props.conditionOne}
            label="check 1"
          />
        </div>
        <div className={styles.textContent}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae totam eos nisi impedit quos! Animi temporibus
          ratione, facilis sequi molestiae dignissimos amet nisi totam iusto iste doloremque aut, vel ipsum?
        </div>
        <div className={styles.center}>
          <CheckBox
            styles={['black', 'large']}
            onChange={conditionTwoHandler}
            checked={props.conditionTwo}
            label="check 2"
          />
        </div>
        <div className={styles.whiteBoxContent}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga ducimus saepe maiores sint nostrum ad! Nihil
          voluptate porro excepturi, consequuntur, alias impedit, laboriosam quia sit ut dignissimos inventore accusamus
          odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto beatae a aut molestias, itaque
          atque voluptas enim, quo nesciunt dicta non temporibus et saepe ex sit sapiente mollitia fugiat. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Aspernatur eum dolorum sed, aliquam recusandae hic officia
          adipisci, similique doloribus, veniam dolore deserunt perferendis distinctio ullam quidem pariatur voluptas
          illum consequatur!
        </div>
        {props.privacyPolicyAccepted ? (
          <div className={styles.buttons}>
            <LinkButton
              to={ERouterPath.settlement}
              label={'accepted'}
              styles={['block', 'green']}
              icon={{ name: 'check', position: 'LEFT' }}
            />
          </div>
        ) : (
          <div className={styles.buttons}>
            <Button onClick={props.acceptBtn} styles={['red']}>
              Accept
            </Button>
            <Button onClick={props.rejectBtn} styles={['block']}>
              Reject
            </Button>
          </div>
        )}
      </div>
      {utility(props)}
    </React.Fragment>
  );
  function conditionOneHandler(event: React.ChangeEvent<HTMLInputElement>) {
    props.conditionOneChangeHandler(event.target.checked);
  }
  function conditionTwoHandler(event: React.ChangeEvent<HTMLInputElement>) {
    props.conditionTwoChangeHandler(event.target.checked);
  }
};

function getFooterButtons(props: TProps): IFooterButton[] {
  return [
    {
      type: 'home',
      path: ERouterPath.home,
    },

    {
      type: 'back',
      path: ERouterPath.amount,
    },
    {
      type: 'next',
      path: ERouterPath.settlement,
    },
    {
      type: 'confirm',
      textKey: 'お届け先・日時へ',
      path: ERouterPath.settlement,
      isDisabled: true,
    },
  ];
}

function utility(props: TProps) {
  return (
    <React.Fragment>
      {/* <LoadingInfo isLoading={prop.isLoading} displayType="absolute" /> */}
      <FunctionFooter buttons={getFooterButtons(props)} />
    </React.Fragment>
  );
}

export default withRouter(PrivacyPolicyPage);
