import React from 'react';
import { IProps } from './Tweet';
import s from './Tweet.scss';

export function tweetFromTitle(name: string, title: string = '') {
  return title.replace(`${name} on Twitter: "`, '').slice(0, -1);
}

export default class TweetBlock extends React.PureComponent<IProps> {
  render() {
    const { authorName, title, url } = this.props;
    return (
      <blockquote className={s(s.tweet__block, 'twitter-tweet')}>
        <p className={s.tweet__text} lang="en" dir="ltr">{tweetFromTitle(authorName, title)}</p>
        &mdash; <a className={s.tweet__url} href={url}>{authorName}</a>
      </blockquote>
    );
  }
}
