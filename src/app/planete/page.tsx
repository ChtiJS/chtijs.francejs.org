import ContentBlock from '../../components/contentBlock';
import Heading1 from '../../components/h1';
import Heading2 from '../../components/h2';
import Paragraph from '../../components/p';
import Strong from '../../components/strong';
import Anchor from '../../components/a';
import Article from '../../components/article';
import Cite from '../../components/cite';
import { extract } from '@extractus/feed-extractor';
import buildMetadata from '../../utils/metadata';

const BLOGS = [
  {
    feed: 'https://insertafter.com/fr/blog/index.atom',
    author: 'Nicolas Froidure',
    url: 'https://www.insertafter.com/',
  },
  // {
  //   feed: 'https://davidl.fr/feed.xml',
  //   author: 'David Leuliette',
  //   url: 'https://davidl.fr/',
  // },
  {
    feed: 'https://vincent.billey.me/feed.xml',
    author: 'Vincent Billey',
    url: 'https://github.com/Fenntasy',
  },
];

export async function generateMetadata() {
  return buildMetadata({
    pathname: '/planete',
    title: 'Planète',
    description:
      'Embarquez pour la planète ChtiJS à travers les blogs de ses membres !',
  });
}

type Entry = {
  entry: Required<Awaited<ReturnType<typeof extract>>>['entries'][number];
  feedData: Omit<Awaited<ReturnType<typeof extract>>, 'entries'>;
  blog: (typeof BLOGS)[number];
};

export default async function Page() {
  const entries = (
    await Promise.all(
      BLOGS.map(async (blog) => {
        const { entries, ...data } = await extract(blog.feed);

        return {
          blog,
          entries: entries || [],
          feedData: data,
        };
      })
    )
  )
    .reduce<Entry[]>((currentEntries, { blog, feedData, entries }) => {
      return [
        ...currentEntries,
        ...(entries || []).map((entry) => ({
          entry,
          blog,
          feedData,
        })),
      ];
    }, [])
    .filter((entry) => entry.entry.published)
    .sort((entryA, entryB) =>
      Date.parse(entryA.entry.published as unknown as string) >
      Date.parse(entryB.entry.published as unknown as string)
        ? -1
        : 1
    )
    .slice(0, 20) as Entry[];

  return (
    <ContentBlock>
      <Heading1>Planète</Heading1>
      <Paragraph>
        <Strong>
          Embarquez pour la planète ChtiJS à travers les blogs de ses membres !
        </Strong>
      </Paragraph>
      <div>
        {entries.map((entry) => (
          <Article key={entry.entry.link}>
            <Heading2>
              <Anchor href={entry.entry.link as string}>
                {entry.entry.title}
              </Anchor>
            </Heading2>
            <Paragraph>{entry.entry.description}</Paragraph>
            <Paragraph>
              <>
                {entry.entry.published ? (
                  <>
                    Publié le{' '}
                    {new Date(entry.entry.published).toLocaleDateString()}
                  </>
                ) : (
                  ''
                )}{' '}
                par{' '}
                <Cite>
                  <Anchor href={entry.blog.url as string}>
                    {entry.blog.author}
                  </Anchor>
                </Cite>
              </>
            </Paragraph>
            <Paragraph>
              <Anchor href={entry.entry.link as string}>Lire ➤</Anchor>
            </Paragraph>
          </Article>
        ))}
      </div>
    </ContentBlock>
  );
}
