
import React from 'react';
import { Link } from 'gatsby';
import format from 'date-fns/format';
import { RichText } from 'prismic-reactjs';
import isEmpty from 'lodash/isEmpty';
import AuthorBlock from 'components/author/AuthorBlock';

import s from './Articles.scss';

interface IArticle {
  uid: string;
  title: IPrismicText;
  short_description: IPrismicText;
  publication_date: string;
  author: any;
}

interface IProps {
  title: IPrismicText;
  subheading: IPrismicText;
  articles: IArticle[];
  show: number;
}

export default class Articles extends React.PureComponent<IProps> {

  render() {
    const { title: heading, subheading, articles, show } = this.props;

    if (articles.length === 0) {
      return null;
    }

    return (
      <div className={s.articles}>
        <div className={s.articles__container}>
          <div className={s.articles__row}>
            <div className={s.articles__header}>
              <h2 className={s.articles__headerTitle}>{RichText.asText(heading)}</h2>
              <h2 className={s.articles__headerTitle}>{RichText.asText(subheading)}</h2>
            </div>

            {articles && (
              <ul className={s.articles__list}>
                {articles.slice(0, show).map((article) => {
                  const title = article.title && RichText.asText(article.title);

                  if (!article.uid || !title) {
                    return null;
                  }

                  const url = `/articles/${article.uid}`;
                  const description = RichText.asText(article.short_description);
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
                            <h2 className={s.articles__title}>{title}</h2>
                            {hasAuthor && (
                              <div className={s.articles__author}>
                                <AuthorBlock
                                  name={RichText.asText(article.author.name)}
                                  bio={RichText.asText(article.author.bio)}
                                  image={article.author.image.thumb}
                                />
                              </div>
                            )}
                          </div>
                          <p className={s.articles__description}>{description}</p>
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
