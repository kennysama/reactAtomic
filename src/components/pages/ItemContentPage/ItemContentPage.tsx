import React from 'react';

import StepbarTemplate from '../../templates/StepbarTemplate/StepbarTemplate';
import ItemSubRouter from '../../../sub-routers/ItemSubRouter';
import { IStepbar } from '../../../types/stepbar';

interface IProps {
  stepbar: IStepbar;
}

const ItemContentPage: React.FC<IProps> = (props: IProps) => {
  return (
    <StepbarTemplate stepbar={props.stepbar}>
      <ItemSubRouter />
    </StepbarTemplate>
  );
};

export default ItemContentPage;
