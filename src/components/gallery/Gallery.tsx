import React from 'react';
import { isEmpty } from 'lodash';
import s from './Gallery.scss';

interface IDataItem {
  image: {
    url: string;
  };
  caption: string;
}

interface IProps {
  title: string;
  data: IDataItem[];
}

export default class Gallery extends React.PureComponent<IProps> {

  renderItem = (item: IDataItem, index: number) => (
    <div key={index} className={s.gallery__item}>
      <img
        src={item.image.url}
        alt={item.caption}
      />
    </div>
  )

  render() {
    const { title, data } = this.props;

    return (
      <div className={s.gallery}>
        <div className={s.gallery__container}>
          <div className={s.gallery_title}>
            <h1 className={s.gallery__name}>{title}</h1>
          </div>
          <div className={s.gallery__list}>
            {!isEmpty(data) && (
              data.map(this.renderItem)
            )}
          </div>
        </div>
      </div>
    );
  }
}
