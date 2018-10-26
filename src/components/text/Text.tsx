import React from 'react';
import TextBlock from './TextBlock';
import s from './Text.scss';

export default function Text({ text }: any) {
  return (
    <div className={s.text}>
      <div className={s.text__container}>
        <div className={s.text__row}>
          <div className={s.text__col}>
            <TextBlock text={text} />
          </div>
        </div>
      </div>
    </div>
  );
}
