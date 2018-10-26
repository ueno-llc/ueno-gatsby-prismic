import React from 'react';
import AuthorBlock from './AuthorBlock';

import s from './Author.scss';

interface IProps {
  name: string;
  bio: string;
  image?: string;
  loading?: boolean;
}

export default function Author({ name, bio, image, loading }: IProps) {
  return (
    <div className={s(s.author, { isLoading: loading })}>
      <div className={s.author__container}>
        <div className={s.author__row}>
          <div className={s.author__col}>
            <div className={s.author__block}>
              <AuthorBlock name={name} bio={bio} image={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
