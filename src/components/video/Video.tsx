import React from 'react';
import VideoBlock from './VideoBlock';
import s from './Video.scss';

export interface IProps {
  url: string;
  caption?: React.ReactNode;
}

export default class Video extends React.PureComponent<IProps> {
  render() {
    const { url, caption } = this.props;
    return (
      <div className={s.video}>
        <div className={s.video__container}>
          <VideoBlock url={url} caption={caption} />
        </div>
      </div>
    );
  }
}
