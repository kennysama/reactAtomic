import React from 'react';

import Label from '../Label/Label';
import './InputText.scss';
import I18TextContainer from '../../../containers/I18Text/I18Text';

export interface IProps {
  label?: string;
  placeholder?: string;
  onValueChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  labelPosition?: 'TOP' | 'LEFT';
  styles?: string[];
}

const InputText: React.FC<IProps> = ({
  label = '',
  onValueChanged,
  onClick,
  onBlur,
  readOnly = false,
  disabled = false,
  labelPosition = 'TOP',
  styles = [''],
  placeholder = '',
  value = '',
}) => {
  return (
    <div className={getLabelInputClassName(labelPosition)}>
      <Label position={labelPosition} text={label} />

      {placeholder ? (
        <I18TextContainer translateChildren={{ childrenComponent: inputText, key: placeholder }} />
      ) : (
        inputText()
      )}
    </div>
  );

  function inputText(key: string = '') {
    return (
      <input
        disabled={disabled}
        readOnly={readOnly}
        type="text"
        placeholder={key}
        onChange={onValueChanged}
        value={value}
        onClick={onClick}
        onBlur={onBlur}
        className={getBtnClassName('input-text__log', styles)}
      />
    );
  }

  function getBtnClassName(blockClassName = 'input-text__log', blockStyles: string[] = []): string {
    const classNames = blockStyles.map(style => ` ${blockClassName}--${style}`);
    return `${blockClassName}${classNames.join('')}`;
  }

  function getLabelInputClassName(style: 'LEFT' | 'TOP' = 'LEFT'): string {
    const left = 'input-text';
    const top = 'input-text__top';
    return style === 'TOP' ? top : left;
  }
};

export default InputText;
