import React from 'react';
import { RichText } from 'prismic-reactjs';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Heading from 'components/heading/Heading';
import Slices from 'components/slices/Slices';
import Author from 'components/author/Author';

export const query = graphql`
  query ArticleQuery($prismicId: String!) {
    prismicArticle(
      prismicId: {
        eq: $prismicId
      }
    ) {
      id
      prismicId
      uid
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
`;

export default class Article extends React.PureComponent<any> {

  get article() {
    const { prismicArticle  } = this.props.data;
    return {
      ...prismicArticle,
      ...JSON.parse(prismicArticle.dataString),
    };
  }

  get author() {
    const { prismicArticle } = this.props.data;
    const authorDocument = ([...prismicArticle.data.author.document] || []).shift();

    if (!authorDocument) {
      return null;
    }

    return {
      ...authorDocument,
      ...JSON.parse(authorDocument.dataString),
    };
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          title={RichText.asText(this.article.meta_title)}
          meta={[{ name: 'description', content: RichText.asText(this.article.meta_description) }]}
        />
        {this.author && (
          <Author
            name={RichText.asText(this.author.name)}
            bio={RichText.asText(this.author.bio)}
            image={this.author.image.thumb.url}
          />
        )}
        <Heading>{RichText.asText(this.article.title)}</Heading>
        <Slices data={this.article.body} />
      </React.Fragment>
    );
  }
}
