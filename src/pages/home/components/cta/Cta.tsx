import React from 'react';
import s from './Cta.scss';

export default class Cta extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={s.cta}>
        <div className={s.cta__container}>
          {children}
        </div>
      </div>
    );
  }
}
