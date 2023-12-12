import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';
import { publicRuntimeConfig } from '../utils/config';
import {
  ORGANISATION_NAME,
  DOMAIN_NAME,
  TWITTER_ACCOUNT,
} from '../utils/constants';
import type { Metadata } from 'next';

export default async function buildMetadata({
  pathname,
  title,
  description,
  image,
  type = 'website',
}: {
  pathname: string;
  title: string;
  description: string;
  image?: string;
  type?: OpenGraphType;
}): Promise<Metadata> {
  const fullTitle = `${title ? `${title} - ` : ''}${ORGANISATION_NAME}`;
  const canonicalURL =
    publicRuntimeConfig.baseURL +
    publicRuntimeConfig.basePath +
    (pathname || '/');
  const imageURL =
    typeof image === 'string' && image && /^https?:\/\//.test(image)
      ? image
      : image
        ? publicRuntimeConfig.baseURL +
          publicRuntimeConfig.basePath +
          (image.startsWith('/') ? '' : '/') +
          image
        : publicRuntimeConfig.baseURL +
          publicRuntimeConfig.basePath +
          '/images/banner.png';

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalURL,
    },
    authors: [
      {
        name: ORGANISATION_NAME,
        url: `https://${DOMAIN_NAME}`,
      },
    ],
    icons: {
      icon: [
        {
          url: publicRuntimeConfig.basePath + '/images/favicon.svg',
          type: 'image/svg+xml',
          sizes: 'any',
        },
        {
          url: publicRuntimeConfig.basePath + '/images/favicon-16.png',
          type: 'image/png',
          sizes: '16x16',
        },
        {
          url: publicRuntimeConfig.basePath + '/images/favicon-128.png',
          type: 'image/png',
          sizes: '128x128',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      url: canonicalURL,
      title: fullTitle,
      description,
      images: [imageURL],
      siteName: ORGANISATION_NAME,
      locale: 'fr_FR',
      type,
    },
    twitter: {
      site: `@${TWITTER_ACCOUNT}`,
      creator: `@${TWITTER_ACCOUNT}`,
    },
  };
}
