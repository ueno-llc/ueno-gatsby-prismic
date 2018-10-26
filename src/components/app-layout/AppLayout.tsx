import React from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { get } from 'lodash';

import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import Devtools from 'components/devtools/Devtools';
import s from './AppLayout.scss';
import Navigation from 'components/navigation/Navigation';

interface IProps {
  children: React.ReactNode;
}

export default class AppLayout extends React.PureComponent<IProps> {

  public get options() {
    return {
      header: true,
      footer: true,
      ...get(React.Children.toArray(this.props.children), '0.type.layoutOptions', {}),
    };
  }

  get pages() {
    return [
      <Link key="home" to="/">Home</Link>,
      <Link key="articles" to="/articles">Articles</Link>,
      <Link key="about" to="/about">About</Link>,
      <Link key="products" to="/products">Products</Link>,
      <Link key="contact" to="/contact">Contact</Link>,
    ];
  }

  public renderLayout = (data: any) => {
    const { title } = data.site.siteMetadata;

    return (
      <React.Fragment>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>

        {this.options.header && (
          <Header>
            <Navigation>
              {this.pages}
            </Navigation>
          </Header>
        )}

        <div className={s.layout}>
          {this.props.children}
        </div>

        {this.options.footer && (
          <Footer />
        )}

        <Devtools />
      </React.Fragment>
    );
  }

  public render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={this.renderLayout}
      />
    );
  }
}
