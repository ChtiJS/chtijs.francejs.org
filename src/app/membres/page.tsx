import ContentBlock from '../../components/contentBlock';
import Heading1 from '../../components/h1';
import Heading2 from '../../components/h2';
import Paragraph from '../../components/p';
import Strong from '../../components/strong';
import Anchor from '../../components/a';
import { Octokit } from '@octokit/rest';
import Article from '../../components/article';
import styles from './membres.module.scss';
import buildMetadata from '../../utils/metadata';

export type Members = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['orgs']['listMembers']>
>['data'];
export type Profile = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['users']['getByUsername']>
>['data'];

export async function generateMetadata() {
  return buildMetadata({
    pathname: '/membres',
    title: 'Membres',
    description: 'Découvrez la liste des membres de ChtiJS.',
  });
}

export default async function Page() {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  });
  const membersResponse = await octokit.rest.orgs.listMembers({
    org: 'ChtiJS',
  });

  const entries = (await Promise.all(
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
  )) as (Pick<Members[number], 'id' | 'avatar_url' | 'login'> &
    Pick<Profile, 'name' | 'bio' | 'blog' | 'twitter_username' | 'html_url'>)[];

  return (
    <ContentBlock>
      <Heading1>Membres</Heading1>
      <Paragraph>
        <Strong>Découvrez la liste des membres de ChtiJS.</Strong>
      </Paragraph>
      <div className={styles.root}>
        {entries.map((entry) => (
          <Article key={entry.id}>
            <img src={entry.avatar_url} alt={`Avatar de ${entry.name}`} />
            <Heading2>
              <Anchor
                href={entry.html_url as string}
                title={`Se rendre sur le profil GitHub de ${entry.name}`}
              >
                {entry.name} alias {entry.login}
              </Anchor>
            </Heading2>
            <Paragraph>➤ {entry.bio}</Paragraph>
            <Paragraph className={styles.links}>
              {entry.blog ? (
                <>
                  <Anchor
                    href={
                      (entry.blog.startsWith('http') ? '' : 'https://') +
                      entry.blog
                    }
                    title={`Se rendre sur le blog de ${entry.name}`}
                  >
                    📰 Blog
                  </Anchor>{' '}
                </>
              ) : null}
              {entry.twitter_username ? (
                <>
                  <Anchor
                    href={'https://twitter.com/' + entry.twitter_username}
                    title={`Se rendre sur le profil Twitter de ${entry.name}`}
                  >
                    📲 Twitter
                  </Anchor>{' '}
                </>
              ) : null}
              {
                <Anchor
                  href={entry.html_url as string}
                  title={`Se rendre sur le profil GitHub de ${entry.name}`}
                >
                  💻 GitHub
                </Anchor>
              }
            </Paragraph>
          </Article>
        ))}
      </div>
    </ContentBlock>
  );
}
