import React from 'react';
import { TimelineLite } from 'gsap';
import { TransitionGroup } from 'react-transition-group';
import { RichText } from 'prismic-reactjs';
import Content from './Content';
import s from './Hero.scss';

interface IProps {
  carousel: any[];
}

interface IState {
  current: number;
}

export default class Hero extends React.PureComponent<IProps, IState> {

  state: IState = {
    current: 0,
  };

  heroRef: React.RefObject<HTMLDivElement> = React.createRef();

  changeSlide = (index: number, color: string) => {
    if (!this.heroRef.current) {
      return;
    }

    const t = new TimelineLite();
    const ease = 'Power4.easeInOut';

    t.to(this.heroRef.current, 0.6, {
      backgroundColor: color,
      ease,
    });

    this.setState({ current: index });
  }

  onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { currentTarget } = e;
    const i = Number(currentTarget.getAttribute('data-index'));

    return this.changeSlide(i, this.props.carousel[i].color);
  }

  renderPaginationItem = (_item: any, i: number) => (
    <li
      key={`pagination-item-${i}`}
      data-index={i}
      onClick={this.onClick}
      className={s(s.hero__item, { active: this.state.current === i })}
    />
  )

  render() {
    const { carousel } = this.props;
    const { current } = this.state;

    return (
      <div className={s.hero} ref={this.heroRef}>
        <div className={s(s.hero__container, s.hero__top)}>
          <div className={s.hero__row}>
            {carousel && (
              <TransitionGroup
                className={s.hero__content}
                enter={true}
                exit={true}
              >
                <Content
                  key={`content-slide-${current}`}
                  title={RichText.asText(carousel[current].title)}
                  text={RichText.render(carousel[current].text)}
                />
              </TransitionGroup>
            )}
          </div>
        </div>

        <div className={s.hero__container}>
          <ul className={s.hero__pagination}>
            {carousel && carousel.map(this.renderPaginationItem)}
          </ul>
        </div>
      </div>
    );
  }
}
