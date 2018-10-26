import React from 'react';
import { RichText } from 'prismic-reactjs';
import s from './Text.scss';

export default function TextBlock({ text }: any) {
  return (
    <div className={s.textblock}>
      {RichText.render(text)}
    </div>
  );
}
