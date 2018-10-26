import React from 'react';
import { RichText } from 'prismic-reactjs';
import { get } from 'lodash';
import Image from 'components/image/Image';
import Contact from 'components/contact/Contact';
import Gallery from 'components/gallery/Gallery';
import Text from 'components/text/Text';
import Quote from 'components/quote/Quote';
import Picture from 'components/picture/Picture';
import Video from 'components/video/Video';
import Tweet from 'components/tweet/Tweet';
import Profiles from 'components/profiles/Profiles';
import Profile from 'components/profiles/Profile';

interface IProfile {
  profile_link: {
    data: {
      name: string;
      bio: string;
      image: {
        url: string;
        alt: string;
      };
    };
  };
}

interface ITweet {
  tweet: {
    url: string;
    author_name: string;
    title: string;
  };
}

function renderProfile({ profile_link: { data: { name, bio, image } } }: IProfile, index: number) {
  return (
    <Profile
      key={`profile-${index}`}
      image={image.url}
      name={RichText.asText(name)}
      description={RichText.asText(bio)}
    />
  );
}

function renderTweet(item: ITweet) {
  return (
    <Tweet
      key={item.tweet.url}
      url={item.tweet.url}
      authorName={item.tweet.author_name}
      title={item.tweet.title}
    />
  );
}

function Slice(slice: any, index: number) {
  const { slice_type } = slice;
  const key = `slice-${slice_type}-${index}`;

  switch (slice_type) {
    case 'gallery':
      return (
        <Gallery
          key={key}
          title={RichText.asText(slice.primary.title)}
          data={slice.items}
        />
      );

    case 'profiles':
      return (
        <Profiles
          title={RichText.asText(slice.primary.profiles_title)}
          key={key}
        >
          {slice.items.map(renderProfile)}
        </Profiles>
      );

    case 'contact_form':
      return (
        <Contact
          key={key}
          responseTitle={RichText.asText(slice.primary.response_message_title)}
          responseText={RichText.asText(slice.primary.response_message_text)}
          target={RichText.asText(slice.primary.target_url)}
        />
      );

    case 'image':
      return (
        <Image
          key={key}
          width={slice.primary.image.dimensions.width}
          height={slice.primary.image.dimensions.height}
          alt={slice.primary.image.alt}
          src={slice.primary.image.url}
          caption={RichText.render(slice.primary.caption)}
        />
      );

    case 'text':
      return (
        <Text
          key={key}
          text={slice.primary.text}
        />
      );

    case 'quote':
      return (
        <Quote
          key={key}
          text={slice.primary.quote}
        />
      );

    case 'tweets':
      return slice.items.map(renderTweet);

    case 'video':
      return (
        <Video
          key={key}
          url={slice.primary.video.url}
          caption={RichText.render(slice.primary.caption, 'richtext')}
        />
      );

    case 'picture':
      return (
        <Picture
          key={key}
          mobileView={get(slice.primary.image, 'mobile', {})}
          mobileView2x={get(slice.primary.image, 'mobile_2x', {})}
          tabletView={get(slice.primary.image, 'tablet', {})}
          tabletView2x={get(slice.primary.image, 'tablet_2x', {})}
          mainView={get(slice.primary.image, 'desktop', {})}
          mainView2x={get(slice.primary.image, 'desktop_2x', {})}
        />
      );

    default:
      return null;
  }
}

export default function Slices({ data }: { data: any[] }) {
  return (
    <React.Fragment>
      {data.map(Slice)}
    </React.Fragment>
  );
}
