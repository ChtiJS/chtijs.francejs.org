import { writeFile } from 'fs';
import { promisify } from 'util';
import { join as joinPath } from 'path';
import { generateAtomFeed, generateRSSFeed } from './feeds';
import { publicRuntimeConfig } from './config';
import { ORGANISATION_NAME } from './constants';
import type { FeedDescription, FeedItem } from './feeds';
import type {
  BaseListingPageMetadata,
  BaseContentPageMetadata,
} from './contents';

const doWriteFile = promisify(writeFile);

const PROJECT_DIR = joinPath('.');
const baseURL = publicRuntimeConfig.baseURL;
const builtAt = new Date().toISOString();

export async function buildAssets<T extends BaseContentPageMetadata>(
  props: BaseListingPageMetadata<T> & {
    title: string;
    description: string;
  },
  path: string
) {
  await Promise.all([
    (async () => {
      const { title, description, entries } = props;
      const feedItems = entries.map((entry) => ({
        title: entry.title,
        description: entry.description,
        url: `${baseURL}${path}/${entry.id}`,
        updatedAt: entry.date,
        publishedAt: entry.date,
        author: {
          name: ORGANISATION_NAME,
        },
      }));
      const commonDescription: Omit<FeedDescription, 'url'> = {
        title: `${title} - ${ORGANISATION_NAME}`,
        sourceURL: `${baseURL}${path}`,
        description,
        updatedAt: new Date(
          entries.reduce(
            (higherTimestamp, entry) =>
              Math.max(higherTimestamp, Date.parse(entry.date)),
            0
          )
        ).toISOString(),
        builtAt,
      };

      await Promise.all([
        buildAtomFeed(commonDescription, feedItems, path),
        buildRSSFeed(commonDescription, feedItems, path),
      ]);
    })(),
  ]);
}

async function buildAtomFeed(
  commonDescription: Omit<FeedDescription, 'url'>,
  feedItems: FeedItem[],
  path: string
) {
  const content = await generateAtomFeed(
    {
      ...commonDescription,
      url: `${baseURL}${path}.atom`,
    },
    feedItems
  );

  await doWriteFile(
    joinPath(PROJECT_DIR, 'public', `${path.slice(1)}.atom`),
    content
  );
}

async function buildRSSFeed(
  commonDescription: Omit<FeedDescription, 'url'>,
  feedItems: FeedItem[],
  path: string
) {
  const content = await generateRSSFeed(
    {
      ...commonDescription,
      url: `${baseURL}${path}.rss`,
    },
    feedItems
  );

  await doWriteFile(
    joinPath(PROJECT_DIR, 'public', `${path.slice(1)}.rss`),
    content
  );
}
