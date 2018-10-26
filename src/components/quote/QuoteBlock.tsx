import React from 'react';
import { RichText } from 'prismic-reactjs';
import s from './Quote.scss';

export default function Quote({ text }: any) {
  return (
    <blockquote className={s.quote__block}>
      {RichText.render(text)}
    </blockquote>
  );
}
