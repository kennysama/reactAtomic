import React, { Component } from 'react';
// import Radio from '@material-ui/core/Radio/Radio';

// import './RadioGroup.scss';
import styles from './RadioGroup.module.scss';
import { TRadioGroup } from '../../../types/radio-group';

// import Label from '../Label/Label';
import I18TextContainer from '../../../containers/I18Text/I18Text';

interface IProps {
  groupName: string;
  handleChange: (newValue: string) => void;
  data: TRadioGroup[];
}

interface IState {
  selectedValue: string;
}

class RadioGroup extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { selectedValue: props.data[0].value };
  }
  render() {
    return (
      <React.Fragment>
        {this.props.data.map(item => {
          return (
            <div className={styles.radioGroup} key={item.key}>
              <label onClick={this.onChange.bind(this, item.value)}>
                <input
                  type="radio"
                  checked={this.state.selectedValue === item.value}
                  onChange={this.onChange.bind(this, item.value)}
                  value={item.value}
                  name={this.props.groupName}
                />
                <span>
                  <I18TextContainer textKey={item.text} />
                </span>
              </label>
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  onChange = (newValue: string) => {
    this.setState({ selectedValue: newValue });
    this.props.handleChange(newValue);
  };
}
export default RadioGroup;
