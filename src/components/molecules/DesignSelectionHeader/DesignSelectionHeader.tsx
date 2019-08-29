import React from 'react';

import styles from './DesignSelectionHeader.module.scss';

interface IProps {
  fabricCode: string;
  brandName: string;
  modelName: string;
  unitPrice: number;
  optionPrice: number;
}

const DesignSelectionHeader: React.FC<IProps> = (props: IProps) => {
  const { fabricCode, brandName, modelName, unitPrice, optionPrice } = props;

  const leftContents = [
    {
      label: '生地:',
      item: fabricCode,
    },
    {
      label: 'ブランド:',
      item: brandName,
    },
    {
      label: 'モデル:',
      item: modelName,
    },
  ];

  const taxIn = <span className={styles.tax}>(税込)</span>;

  const rightContents = [
    {
      label: '本体価格',
      item: (
        <React.Fragment>
          {`¥ ${unitPrice}`} {taxIn}
        </React.Fragment>
      ),
    },
    {
      label: 'オプション価格',
      item: (
        <React.Fragment>
          {`¥ ${optionPrice}`} {taxIn}
        </React.Fragment>
      ),
    },
    {
      label: '商品合計',
      item: (
        <React.Fragment>
          {`¥ ${unitPrice + optionPrice}`} {taxIn}
        </React.Fragment>
      ),
    },
  ];

  const renderListItems = (
    label: string,
    item: string | React.ReactNode,
    isPrice: boolean = false,
    isTotal: boolean = false,
  ) => {
    const textStyle = isPrice ? styles.textPrice : '';
    const totalStyle = isPrice && isTotal ? [styles.listItem, styles.total].join(' ') : styles.listItem;

    return (
      <div className={totalStyle} key={label}>
        <div className={styles.left}>
          <p className={styles.label}>{label}</p>
        </div>
        <div className={textStyle}>
          <p className={styles.label}>{item}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>{leftContents.map(v => renderListItems(v.label, v.item))}</div>
      <div className={styles.rightBlock}>
        {rightContents.map((v, i) => {
          return renderListItems(v.label, v.item, true, i === 2);
        })}
      </div>
    </div>
  );
};

export default DesignSelectionHeader;
