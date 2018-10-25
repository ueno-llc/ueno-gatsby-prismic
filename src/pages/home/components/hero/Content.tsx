import React from 'react';
import { TimelineLite } from 'gsap';
import { Transition } from 'react-transition-group';

import s from './Content.scss';

const ease = 'Power4.easeInOut';

interface IProps {
  title: string;
  text: React.ReactNode;
}

export default class Content extends React.Component<IProps> {

  titleRef: React.RefObject<HTMLHeadingElement> = React.createRef();
  textRef: React.RefObject<HTMLHeadingElement> = React.createRef();

  t = new TimelineLite();

  onEnter = (node: HTMLElement) => {
    this.t.staggerFromTo(
      node.querySelectorAll('[data-transition]'),
      0.7,
      { alpha: 0 },
      { alpha: 1, ease },
    );
  }

  onExit = (node: HTMLElement) => {
    this.t.staggerFromTo(
      node.querySelectorAll('[data-transition]'),
      0.2,
      { alpha: 1 },
      { alpha: 0, ease },
    );
  }

  addCallback = (_node: HTMLElement, done: () => void) => {
    this.t.call(done);
  }

  render() {
    const { title, text } = this.props;

    return (
      <Transition
        {...this.props}
        timeout={1000}
        onEnter={this.onEnter}
        onExiting={this.onExit}
        addEndListener={this.addCallback}
      >
        <div className={s.absolute}>
          <div className={s.content}>
            <h1 className={s.content__title} data-transition={true}>
              {title}
            </h1>

            <div className={s.content__text} data-transition={true}>
              {text}
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}
