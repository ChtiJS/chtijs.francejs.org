import { join as pathJoin } from 'path';
import ContentBlock from '../../components/contentBlock';
import Paragraph from '../../components/p';
import Anchor from '../../components/a';
import { parseMarkdown, renderMarkdown } from '../../utils/markdown';
import { readEntry, readPaths } from '../../utils/frontmatter';
import { toASCIIString } from '../../utils/ascii';
import buildMetadata from '../../utils/metadata';
import type { MarkdownRootNode } from '../../utils/markdown';

type Metadata = {
  date: string;
  title: string;
  description: string;
  author: string;
  illustration?: {
    href: string;
    alt: string;
  };
  lang: string;
  location: string;
};
type Entry = {
  id: string;
  content: MarkdownRootNode;
} & Metadata;

type Params = { id: string };

export async function generateMetadata({ params }: { params: Params }) {
  const result = await readEntry<Metadata>(
    pathJoin('contents', 'pages', (params?.id as string) + '.md')
  );
  const entry: Entry = {
    ...result.attributes,
    id: toASCIIString(result.attributes.title),
    content: parseMarkdown(result.body) as MarkdownRootNode,
  };

  return buildMetadata({
    pathname: `/${entry.id}`,
    title: entry.title,
    description: entry.description,
    image: entry.illustration?.href,
  });
}

export default async function Page({ params }: { params: Params }) {
  const result = await readEntry<Metadata>(
    pathJoin('contents', 'pages', (params?.id as string) + '.md')
  );
  const entry: Entry = {
    ...result.attributes,
    id: toASCIIString(result.attributes.title),
    content: parseMarkdown(result.body) as MarkdownRootNode,
  };

  return (
    <ContentBlock>
      {renderMarkdown({ index: 0 }, entry.content)}
      <div className="clear"></div>
      <Paragraph>
        <Anchor href="/">Retour</Anchor>
      </Paragraph>
    </ContentBlock>
  );
}

export async function generateStaticParams() {
  const paths = (await readPaths(pathJoin('.', 'contents', 'pages'))).map(
    (path) => ({
      id: path.replace('.md', ''),
    })
  );

  return paths;
}
