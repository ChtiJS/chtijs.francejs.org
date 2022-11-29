import { join as pathJoin } from "path";
import Layout from "../layouts/main";
import ContentBlock from "../components/contentBlock";
import Paragraph from "../components/p";
import Anchor from "../components/a";
import { fixText } from "../utils/text";
import { parseMarkdown, renderMarkdown } from "../utils/markdown";
import { readEntry, readPaths } from "../utils/frontmatter";
import { toASCIIString } from "../utils/ascii";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { MarkdownRootNode } from "../utils/markdown";

type Metadata = {
  date: string;
  title: string;
  description: string;
  author: string;
  illustration?: {
    href: string;
    alt: string;
  };
};
type Entry = {
  id: string;
  content: MarkdownRootNode;
} & Metadata;

type Params = { id: string };
type Props = { entry: Entry };

const Page:NextPage<Props> = ({ entry }) => {
  return (
    <Layout
      title={`${fixText(entry.title)}`}
      description={fixText(entry.description)}
      image={entry.illustration?.href}
    >
      <ContentBlock>
        {renderMarkdown({ index: 0 }, entry.content)}
        <div className="clear"></div>
        <Paragraph>
          <Anchor href="/">Retour</Anchor>
        </Paragraph>
      </ContentBlock>
    </Layout>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await readPaths(pathJoin(".", "contents", "pages"))).map(
    (path) => ({
      params: { id: path.replace(".md", "") },
    })
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const result = await readEntry<Metadata>(
    pathJoin("contents", "pages", (params?.id as string) + ".md")
  );

  return {
    props: {
      entry: {
        ...result.attributes,
        id: toASCIIString(result.attributes.title),
        content: parseMarkdown(result.body) as MarkdownRootNode,
      },
    },
  };
};