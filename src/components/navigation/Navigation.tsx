import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { Portal } from 'react-overlays';
import Button from 'components/button/Button';
import Mobile from './Mobile';
import s from './Navigation.scss';

interface IState {
  isMobile: boolean;
  isOpen: boolean;
}

export default class Navigation extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  };

  state: IState = {
    isMobile: false,
    isOpen: false,
  };

  componentDidMount() {
    requestAnimationFrame(this.onResize);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.setState({ isMobile: !window.matchMedia('(min-width: 719px)').matches });
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  link(c: React.ReactElement<any>) {
    const { isMobile } = this.state;
    const evt = { className: s.navigation__link, onClick() { return; } };

    if (isMobile) {
      evt.onClick = this.toggleMenu;
    }

    return (
      <li className={s.navigation__item}>
        {React.cloneElement(c, { ...evt })}
      </li>
    );
  }

  get mobileNavigation() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <button
          className={s(s.navigation__button, { isOpen })}
          onClick={this.toggleMenu}
        >
          open
        </button>

        <Portal>
          <TransitionGroup>
            {isOpen && (
              <Mobile>
                {Children.map(children, this.renderItem)}
              </Mobile>
            )}
          </TransitionGroup>
        </Portal>
      </div>
    );
  }

  get desktopNavigation() {
    const { children } = this.props;

    return (
      <nav className={s.navigation}>
        <ul className={s.navigation__list}>
          {Children.map(children, this.renderItem)}
        </ul>
      </nav>
    );
  }

  renderItem = (c: any) => {
    if (c.key === 'contact' && !this.state.isMobile) {
      return (
        <div className={s.navigation__cta}>
          <Button to="/contact" stroke={true}>Contact</Button>
        </div>
      );
    }

    return this.link(c);
  }

  render() {
    const { isMobile } = this.state;

    return isMobile ? this.mobileNavigation : this.desktopNavigation;
  }
}
