import React from 'react';
import TweetBlock from './TweetBlock';
import s from './Tweet.scss';

export interface IProps {
  authorName: string;
  url: string;
  title: string;
}

export default class Tweet extends React.PureComponent<IProps> {

  render() {
    const { authorName, title, url } = this.props;

    return (
      <div className={s.tweet}>
        <div className={s.tweet__container}>
          <div className={s.tweet__row}>
            <div className={s.tweet__col}>
              <TweetBlock authorName={authorName} url={url} title={title} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
