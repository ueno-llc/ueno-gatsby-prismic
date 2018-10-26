import React from 'react';
import ContactBlock from './Block';
import s from './Contact.scss';

interface IProps {
  target: string;
  responseText: string;
  responseTitle: string;
}

export default class Contact extends React.PureComponent<IProps> {
  render() {
    const { target, responseText, responseTitle } = this.props;
    return (
      <div className={s.contact}>
        <div className={s.contact__container}>
          <div className={s.contact__row}>
            <div className={s.contact__col}>
              <ContactBlock
                target={target}
                responseText={responseText}
                responseTitle={responseTitle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
