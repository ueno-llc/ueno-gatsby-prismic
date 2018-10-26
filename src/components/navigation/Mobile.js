import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import s from './Mobile.scss';

export default class Mobile extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  componentWillEnter(cb) {
    if (!this.nav) return;

    const t = new TimelineLite();

    t.addLabel('start');

    t.set(
      document.querySelector('html'),
      { overflow: 'hidden' },
    );

    t.fromTo(
      this.nav,
      0.4,
      {
        x: '100%',
      },
      {
        x: '0%',
        ease: 'Power4.easeInOut',
      },
      'start',
    );

    t.call(cb);
  }

  componentWillLeave(cb) {
    const t = new TimelineLite();

    t.addLabel('start');

    t.set(
      document.querySelector('html'),
      { overflow: '' },
    );

    t.to(
      this.nav,
      0.4,
      {
        x: '100%',
        ease: 'Power4.easeInOut',
      },
      'start',
    );

    t.call(cb);
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={(c) => { this.nav = c; }} className={s.mobile}>
        <div className={s.mobile__container}>
          {children}
        </div>
      </div>
    );
  }
}
