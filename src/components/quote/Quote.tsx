import React from 'react';
import QuoteBlock from './QuoteBlock';
import s from './Quote.scss';

export default function Quote({ text }: any) {
  return (
    <div className={s.quote}>
      <div className={s.quote__container}>
        <div className={s.quote__row}>
          <div className={s.quote__col}>
            <QuoteBlock text={text} />
          </div>
        </div>
      </div>
    </div>
  );
}
