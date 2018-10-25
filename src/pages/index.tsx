import React from 'react';
import { graphql } from 'gatsby';
import Button from 'components/button/Button';

import Hero from './home/components/hero/Hero';
import Cta from './home/components/cta/Cta';
import Articles from './home/components/articles/Articles';

export const query = graphql`
  query Homepage {
    prismicHomepage(lang: { eq: "en-us" }) {
      id
      prismicId
      dataString
      data {
        featured_articles {
          article {
            document {
              uid
              prismicId
              dataString
              data {
                author {
                  document {
                    prismicId
                    dataString
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface ICarousel {
  color: string;
  title: IPrismicText;
  text: IPrismicText;
}

interface IPrismicHomepage {
  meta_title: IPrismicText;
  meta_description: IPrismicText;
  articles_title: IPrismicText;
  articles_subheading: IPrismicText;
  carousel: ICarousel[];
}

interface IProps {
  data: {
    prismicHomepage: {
      dataString: string;
    };
  };
}

export default class Home extends React.PureComponent<IProps> {

  get data(): IPrismicHomepage {
    return JSON.parse(this.props.data.prismicHomepage.dataString);
  }

  get title() {
    return this.data.meta_title;
  }

  get description() {
    return this.data.meta_description;
  }

  get articlesTitle() {
    return this.data.articles_title;
  }

  get articlesSubheading() {
    return this.data.articles_subheading;
  }

  get featuredArticles() {
    return (this.props as any).data.prismicHomepage.data.featured_articles
      .map(({ article }: any) => article.document[0])
      .map((article: any) => ({
        ...article,
      ...JSON.parse(article.dataString),
      }))
      .map((article: any) => ({
        ...article,
        author: JSON.parse(article.data.author.document[0].dataString),
      }));
  }

  render() {
    return (
      <React.Fragment>
        <Hero carousel={this.data.carousel} />

        <Articles
          title={this.articlesTitle}
          subheading={this.articlesSubheading}
          articles={this.featuredArticles}
          show={4}
        />

        <Cta>
          <p>Want to talk more.</p>
          <Button to="/contact" large={true} stroke={true}>Contact us</Button>
        </Cta>

      </React.Fragment>
    );
  }
}
