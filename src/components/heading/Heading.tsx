import React from 'react';
import s from './Heading.scss';

interface IProps {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Heading({ children, loading }: IProps) {
  return (
    <div className={s(s.heading, { isLoading: loading })}>
      <div className={s.heading__container}>
        <div className={s.heading__row}>
          <div className={s.heading__col}>
            <h1>
              {children}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
