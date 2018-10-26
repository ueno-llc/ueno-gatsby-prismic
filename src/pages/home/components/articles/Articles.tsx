
import React from 'react';
import { Link } from 'gatsby';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import AuthorBlock from 'components/author/AuthorBlock';

import s from './Articles.scss';

interface IProps {
  title?: string;
  subheading?: string;
  articles: any[];
  show: number;
}

export default class Articles extends React.PureComponent<IProps> {

  render() {
    const { title: heading, subheading, articles, show } = this.props;

    return (
      <div className={s.articles}>
        <div className={s.articles__container}>
          <div className={s.articles__row}>
            <div className={s.articles__header}>
              <h2 className={s.articles__headerTitle}>{heading}</h2>
              <h2 className={s.articles__headerTitle}>{subheading}</h2>
            </div>

            {articles && (
              <ul className={s.articles__list}>
                {articles.slice(0, show).map((article) => {
                  if (!article.uid || !article.title) {
                    return null;
                  }

                  const url = `/articles/${article.uid}`;
                  const date = article.publication_date;
                  const hasAuthor = !isEmpty(article.author);

                  return (
                    <li
                      className={s.articles__item}
                      key={`article-${article.uid}`}
                    >
                      <Link className={s.articles__link} to={url}>
                        {date && (
                          <p className={s.articles__date}>{format(date, 'DD MMMM')}</p>
                        )}
                        <div className={s.articles__inner}>
                          <div className={s.articles__lead}>
                            <h2 className={s.articles__title}>{article.title.text}</h2>
                            {hasAuthor && (
                              <div className={s.articles__author}>
                                <AuthorBlock
                                  name={article.author.name.text}
                                  bio={article.author.bio.text}
                                  image={article.author.image.thumb.url}
                                />
                              </div>
                            )}
                          </div>
                          <p className={s.articles__description}>{article.short_description.text}</p>
                          <span className={s.articles__button}>Read more</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}
