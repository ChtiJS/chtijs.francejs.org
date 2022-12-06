import { writeFile } from 'fs';
import { promisify } from 'util';
import { join as joinPath } from 'path';
import { generateAtomFeed, generateRSSFeed } from './feeds';
import { publicRuntimeConfig } from './config';
import { ORGANISATION_NAME } from './constants';
import type { FeedDescription, FeedItem } from './feeds';
import type { BaseProps } from '../pages/blog/index';

const doWriteFile = promisify(writeFile);

const PROJECT_DIR = joinPath('.');
const baseURL = publicRuntimeConfig.baseURL;
const builtAt = new Date().toISOString();

export async function buildAssets(props: BaseProps) {
  await Promise.all([
    (async () => {
      const { title, description, entries } = props;
      const feedItems = entries.map((entry) => ({
        title: entry.title,
        description: entry.description,
        url: baseURL + '/blog/' + entry.id,
        updatedAt: entry.date,
        publishedAt: entry.date,
        author: {
          name: ORGANISATION_NAME,
        },
      }));
      const commonDescription: Omit<FeedDescription, 'url'> = {
        title: `${title} - ${ORGANISATION_NAME}`,
        sourceURL: baseURL + '/blog',
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
        buildAtomFeed(commonDescription, feedItems),
        buildRSSFeed(commonDescription, feedItems),
      ]);
    })(),
  ]);
}

async function buildAtomFeed(
  commonDescription: Omit<FeedDescription, 'url'>,
  feedItems: FeedItem[]
) {
  const content = await generateAtomFeed(
    {
      ...commonDescription,
      url: baseURL + '/blog.atom',
    },
    feedItems
  );

  await doWriteFile(joinPath(PROJECT_DIR, 'public', 'blog.atom'), content);
}

async function buildRSSFeed(
  commonDescription: Omit<FeedDescription, 'url'>,
  feedItems: FeedItem[]
) {
  const content = await generateRSSFeed(
    {
      ...commonDescription,
      url: baseURL + '/blog.rss',
    },
    feedItems
  );

  await doWriteFile(joinPath(PROJECT_DIR, 'public', 'blog.rss'), content);
}
