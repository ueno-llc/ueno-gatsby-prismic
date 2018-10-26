import React from 'react';
import s from './Input.scss';

interface IProps {
  id?: string;
  multiline?: boolean;
  placeholder?: string;
  type?: 'email' | 'text' | 'tel';
  onChange?(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  className?: string;
  [key: string]: any;
}

interface IState {
  hasValue: boolean;
}

export default class Input extends React.Component<IProps, IState> {

  static defaultProps = {
    type: 'text',
    multiline: false,
  };

  inputRef: React.RefObject<HTMLInputElement & HTMLTextAreaElement> = React.createRef();

  state: IState = {
    hasValue: false,
  };

  handleInputKeyUp = () => {
    if (this.inputRef.current) {
      this.setState({
        hasValue: !!this.inputRef.current.value,
      });
    }
  }

  render() {
    const { id, multiline, placeholder, type, onChange, className, ...rest } = this.props;

    const { hasValue } = this.state;
    const InputElement = multiline ? 'textarea' : 'input';

    return (
      <div className={s(s.input, className, { 'input--multiline': multiline })}>
        <label
          className={s(s.input__label, { visible: hasValue })}
          htmlFor={id}
        >
          {placeholder}
        </label>

        <InputElement
          className={s.input__field}
          ref={this.inputRef}
          type={type}
          name={id}
          placeholder={placeholder}
          onKeyUp={this.handleInputKeyUp}
          onChange={onChange}
          {...rest}
        />
      </div>
    );
  }
}
