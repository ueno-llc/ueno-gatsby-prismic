import React from 'react';
import Button from 'components/button/Button';
import Input from './Input';
import s from './Form.scss';

interface IProps {
  onSend(form: any): void;
}

interface IState {
  name: string;
  email: string;
  message: string;
}

export default class ContactForm extends React.PureComponent<IProps, IState> {

  state: IState = {
    name: '',
    email: '',
    message: '',
  };

  onSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = this.state;

    const form = new FormData();

    form.append('name', name);
    form.append('email', email);
    form.append('message', message);

    this.props.onSend(form);
  }

  onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  }

  onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <div className={s.form}>
        <form
          acceptCharset="UTF-8"
          onSubmit={this.onSend}
          className={s.form__form}
        >
          <Input
            placeholder="Name"
            id="name"
            type="text"
            onChange={this.onNameChange}
            className={s.form__input}
            required={true}
          />

          <Input
            placeholder="Email"
            id="email"
            type="text"
            onChange={this.onEmailChange}
            className={s.form__input}
            required={true}
          />

          <Input
            placeholder="Message"
            id="message"
            type="text"
            onChange={this.onMessageChange}
            className={s.form__textarea}
            multiline={true}
            required={true}
          />

          <div className={s.form__button}>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    );
  }
}
