import React from 'react';

import style from './IFrame.module.scss';

interface IProps {
  title: string;
  src: string;
}

const IFrame = (props: IProps) => {
  return <iframe title={props.title} className={style.component} src={props.src} />;
};

export default IFrame;
