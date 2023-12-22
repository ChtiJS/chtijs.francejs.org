import ContentBlock from '../../components/contentBlock';
import Heading1 from '../../components/h1';
import Heading2 from '../../components/h2';
import Paragraph from '../../components/p';
import Strong from '../../components/strong';
import Anchor from '../../components/a';
import { Octokit } from '@octokit/rest';
import Article from '../../components/article';
import styles from './credits.module.scss';
import buildMetadata from '../../utils/metadata';

export type Contributors = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['repos']['listContributors']>
>['data'];
export type Members = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['orgs']['listMembers']>
>['data'];
export type Profile = Awaited<
  ReturnType<InstanceType<typeof Octokit>['rest']['users']['getByUsername']>
>['data'];

export async function generateMetadata() {
  return buildMetadata({
    pathname: '/membres',
    title: 'Les contributeurs du site',
    description: 'Découvrez les personnes qui ont créé le site de ChtiJS.',
  });
}

export default async function Page() {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
  });
  const response = await octokit.rest.repos.listContributors({
    owner: 'ChtiJS',
    repo: 'chtijs.francejs.org',
  });
  const membersResponse = await octokit.rest.orgs.listMembers({
    org: 'ChtiJS',
  });

  const entries = (await Promise.all(
    response.data.map(async (entry) => {
      const member = membersResponse.data.find(
        (member) => member.id === entry.id
      );
      const profile = await octokit.rest.users.getByUsername({
        username: entry.login as string,
      });

      return {
        id: entry.id,
        html_url: entry.html_url,
        avatar_url: entry.avatar_url,
        contributions: entry.contributions,
        name: profile?.data?.name || member?.name || entry.login,
        bio: profile?.data?.bio,
        blog: profile?.data?.blog,
        twitter_username: profile?.data?.twitter_username,
        login: entry.login,
      };
    })
  )) as (Pick<
    Contributors[number],
    'id' | 'avatar_url' | 'contributions' | 'login'
  > &
    Pick<Profile, 'name' | 'bio' | 'blog' | 'twitter_username' | 'html_url'>)[];

  return (
    <ContentBlock>
      <Heading1>Les contributeurs du site</Heading1>
      <Paragraph>
        <Strong>Découvrez les personnes qui ont créé le site de ChtiJS.</Strong>
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
            <Paragraph>
              {entry.contributions <= 1
                ? entry.contributions + ' contribution'
                : entry.contributions + ' contributions'}
            </Paragraph>
            <Paragraph>
              {entry.blog ? (
                <>
                  <Anchor
                    href={
                      (entry.blog.startsWith('http') ? '' : 'https://') +
                      entry.blog
                    }
                    title={`Se rendre sur le blog de ${entry.name}`}
                  >
                    📰Blog
                  </Anchor>{' '}
                </>
              ) : null}
              {entry.twitter_username ? (
                <>
                  <Anchor
                    href={'https://twitter.com/' + entry.twitter_username}
                    title={`Se rendre sur le profil Twitter de ${entry.name}`}
                  >
                    📲Twitter
                  </Anchor>{' '}
                </>
              ) : null}
              {
                <Anchor
                  href={entry.html_url as string}
                  title={`Se rendre sur le profil GitHub de ${entry.name}`}
                >
                  💻GitHub
                </Anchor>
              }
            </Paragraph>
          </Article>
        ))}
      </div>
    </ContentBlock>
  );
}
