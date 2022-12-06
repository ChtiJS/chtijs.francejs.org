import Layout from '../layouts/main';
import ContentBlock from '../components/contentBlock';
import Heading1 from '../components/h1';
import Heading2 from '../components/h2';
import Paragraph from '../components/p';
import Strong from '../components/strong';
import Anchor from '../components/a';
import { Octokit } from '@octokit/rest';
import Article from '../components/article';
import type { GetStaticProps } from 'next';

export type Members = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['orgs']['listMembers']>
>['data'];
export type Profile = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['users']['getByUsername']>
>['data'];

type Props = {
  entries: (Pick<Members[number], 'id' | 'avatar_url' | 'login'> &
    Pick<Profile, 'name' | 'bio' | 'blog' | 'twitter_username' | 'html_url'>)[];
};

const Page = ({ entries }: Props) => {
  return (
    <Layout
      title="Membres"
      description="Découvrez la liste des membres de ChtiJS."
    >
      <ContentBlock>
        <Heading1>Membres</Heading1>
        <Paragraph>
          <Strong>Découvrez la liste des membres de ChtiJS.</Strong>
        </Paragraph>
        <div>
          {entries.map((entry) => (
            <Article key={entry.id}>
              <img src={entry.avatar_url} alt={`Avatar de ${entry.name}`} />
              <Heading2>
                <Anchor href={entry.html_url as string}>
                  {entry.name} alias {entry.login}
                </Anchor>
              </Heading2>
              <Paragraph>➤ {entry.bio}</Paragraph>
              <Paragraph>
                {entry.blog ? (
                  <>
                    <Anchor
                      href={
                        (entry.blog.startsWith('http') ? '' : 'https://') +
                        entry.blog
                      }
                    >
                      📰Blog
                    </Anchor>{' '}
                  </>
                ) : null}
                {entry.twitter_username ? (
                  <>
                    <Anchor
                      href={'https://twitter.com/' + entry.twitter_username}
                    >
                      📲Twitter
                    </Anchor>{' '}
                  </>
                ) : null}
                {<Anchor href={entry.html_url as string}>💻GitHub</Anchor>}
              </Paragraph>
            </Article>
          ))}
        </div>
      </ContentBlock>
      <style jsx>{`
        img {
          float: left;
          height: 6rem;
          width: 6rem;
          margin: 0 2rem 1.5rem 0;
          border-radius: 50px;
          box-shadow: 5px 5px 2px 1px #c1a008;
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  });
  const membersResponse = await octokit.rest.orgs.listMembers({
    org: 'ChtiJS',
  });

  const entries = await Promise.all(
    membersResponse.data.map(async (entry) => {
      const profile = await octokit.rest.users.getByUsername({
        username: entry.login as string,
      });

      return {
        id: entry.id,
        html_url: entry.html_url,
        avatar_url: entry.avatar_url,
        name: profile?.data?.name || entry?.name || entry.login,
        bio: profile?.data?.bio,
        blog: profile?.data?.blog,
        twitter_username: profile?.data?.twitter_username,
        login: entry.login,
      };
    })
  );

  return { props: { entries } as Props };
};

export default Page;
