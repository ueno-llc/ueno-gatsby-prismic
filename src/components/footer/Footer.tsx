import React from 'react';
import SearchBar from 'components/search-bar/SearchBar';

import Logo from 'assets/svg/logo.svg';
import s from './Footer.scss';

export default class Footer extends React.PureComponent {

  renderItem = (child: React.ReactChild, index: number) => (
    <li key={index} className={s.footer__item}>
      {React.cloneElement(child as React.ReactElement<any>, {
        className: s.footer__link,
      })}
    </li>
  )

  render() {
    const social = [
      { text: 'Twitter', url: 'http://twitter.com' },
      { text: 'Facebook', url: 'http://facebook.com' },
    ];

    return (
      <footer className={s.footer}>
        <div className={s.footer__container}>
          <div className={s.footer__row}>
            <div className={s.footer__logo}>
              <Logo />
              <div className={s.footer__search}>
                <SearchBar />
              </div>
            </div>

            <div className={s.footer__navigation}>
              <ul className={s.footer__list}>
                {React.Children.map(this.props.children, this.renderItem)}
              </ul>
            </div>

            <div className={s.footer__social}>
              <ul className={s.footer__list}>
                {social.map((c) => (
                  <li key={c.text} className={s.footer__item}>
                    <a className={s.footer__link} href={c.url}>{c.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
