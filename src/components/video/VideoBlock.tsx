import React from 'react';
import s from './Video.scss';
import { IProps } from './Video';

export default class VideoBlock extends React.PureComponent<IProps> {
  render() {
    const { url, caption } = this.props;
    return (
      <figure className={s.video__figure}>
        <video
          className={s.video__tag}
          src={url}
          height={574}
          autoPlay={true}
          muted={true}
          controls={true}
          loop={true}
        />
        {caption && (
          <figcaption className={s.video__caption}>{caption}</figcaption>
        )}
      </figure>
    );
  }
}
