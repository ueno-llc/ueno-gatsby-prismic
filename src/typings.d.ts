declare module 'prismic-reactjs';
declare module '*.scss';
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

type IPrismicText = Array<{
  type: string;
  text: string;
  spans: Array<{
    start: number;
    end: number;
    type: string;
    data: any;
  }>
}>;
