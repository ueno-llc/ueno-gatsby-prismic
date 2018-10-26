import React from 'react';
import s from './Profiles.scss';

interface IProps {
  children: React.ReactNode;
  title: string;
}

export default class Profiles extends React.PureComponent<IProps> {
  render() {
    const { children, title } = this.props;
    return (
      <div className={s.profiles}>
        <div className={s.profiles__container}>
          <h2 className={s.profiles__title}>{title}</h2>
          <div className={s.profiles__list}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
