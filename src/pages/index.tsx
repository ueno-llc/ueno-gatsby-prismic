import React from 'react';
import Button from 'components/button/Button';
import { oc } from 'ts-optchain';
import { GQLQuery } from 'schema';
import { graphql } from 'gatsby';

import Hero from './home/components/hero/Hero';
import Cta from './home/components/cta/Cta';
import Articles from './home/components/articles/Articles';

interface IProps {
  data: GQLQuery;
}

export const query = graphql`
  query Homepage {
    prismicHomepage(lang: { eq: "en-us" }) {
      id
      prismicId
      dataString
      data {
        meta_title { text }
        meta_description { text }
        articles_title { text }
        articles_subheading { text }
        featured_articles {
          article {
            document {
              uid
              data {
                title { text }
                short_description { text }
                publication_date
                author {
                  document {
                    data {
                      name { text }
                      bio { text }
                      image {
                        thumb { url }
                      }
                    }
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

export default class Home extends React.PureComponent<IProps> {

  get data() {
    return oc(this.props.data.prismicHomepage!.data);
  }

  get title() {
    return this.data.meta_title.text();
  }

  get description() {
    return this.data.meta_description.text();
  }

  get articles() {
    return {
      title: this.data.articles_title.text(),
      subheading: this.data.articles_subheading.text(),
      items: this.data.featured_articles([])
        .map((article) => oc(article).article.document[0])
        .map((article) => ({
          ...article(),
          ...article.data(),
          author: article.data.author.document[0].data(),
        })),
    };
  }

  get carousel() {
    const result = JSON.parse(this.props.data.prismicHomepage!.dataString!);
    return (result && result.carousel) || [];
  }

  render() {
    return (
      <React.Fragment>
        <Hero carousel={this.carousel} />

        <Articles
          title={this.articles.title}
          subheading={this.articles.subheading}
          articles={this.articles.items}
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
