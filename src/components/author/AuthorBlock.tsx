import React from 'react';
import s from './Author.scss';

interface IProps {
  image: string;
  name: string;
  bio: string;
}

export default class AuthorBlock extends React.PureComponent<IProps> {
  render() {
    const { image, name, bio } = this.props;
    return (
      <React.Fragment>
        {image && (
          <div className={s.author__image}>
            <img alt={name} src={image} />
          </div>
        )}
        <div className={s.author__text}>
          <p className={s.author__paragraph}>{name}</p>
          <p className={s.author__paragraph}>{bio}</p>
        </div>
      </React.Fragment>
    );
  }
}
