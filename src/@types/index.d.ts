export interface SocialProps {
  youtube: {
    url: string;
  }[];

   spotify: {
    url: string;
  }[];

}

export interface CarouselProps {
  id: string;
  externalLinks?: SocialProps;
  images: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }[]
}
