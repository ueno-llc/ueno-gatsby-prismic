import React from 'react';
import s from './Picture.scss';

interface Image {
  url: string;
  alt?: string;
}

interface IProps {
  mobileView: Image;
  mobileView2x: Image;
  tabletView: Image;
  tabletView2x: Image;
  mainView: Image;
  mainView2x: Image;
}

export default class Picture extends React.PureComponent<IProps> {

  static defaultProps = {
    mobileView: {},
    mobileView2x: {},
    tabletView: {},
    tabletView2x: {},
    mainView: {},
    mainView2x: {},
  };

  makeSrcSet(src = '', src2x = '') {
    if (src2x !== '') {
      return `${src} 1x, ${src2x} 2x`;
    }

    return undefined;
  }

  render() {
    const {
      mobileView,
      mobileView2x,
      tabletView,
      tabletView2x,
      mainView,
      mainView2x,
    } = this.props;

    return (
      <picture className={s.picture}>
        <source media="(max-width: 719px)" srcSet={this.makeSrcSet(mobileView.url, mobileView2x.url)} />
        <source media="(max-width: 1079px)" srcSet={this.makeSrcSet(tabletView.url, tabletView2x.url)} />
        <source srcSet={this.makeSrcSet(mainView.url, mainView2x.url)} />
        <img src={mainView.url} alt={mainView.alt} />
      </picture>
    );
  }
}
