import React from 'react';
import s from './Profile.scss';

export interface IProps {
  image: string;
  name: string;
  description: string;
}

export default class Profile extends React.PureComponent<IProps> {
  render() {
    const { image, name, description } = this.props;

    return (
      <div className={s.profile}>
        <div className={s.profile__mask}>
          <img src={image} alt={name} className={s.profile__image} />
        </div>

        <h2 className={s.profile__name}>{name}</h2>
        <p className={s.profile__description}>{description}</p>
      </div>
    );
  }
}
