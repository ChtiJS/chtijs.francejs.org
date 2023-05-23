import Layout from '../layouts/main';
import ContentBlock from '../components/contentBlock';
import TweetList from '../components/tweetList';
import Heading1 from '../components/h1';
import Heading2 from '../components/h2';
import Paragraph from '../components/p';
import Strong from '../components/strong';
import Anchor from '../components/a';
import UnorderedList from '../components/ul';
import ListItem from '../components/li';
import { Client } from 'twitter-api-sdk';
import { parseMarkdown } from '../utils/markdown';
import type { MarkdownRootNode } from '../utils/markdown';
import type { GetStaticProps } from 'next';
import type {Tweets} from '../components/tweetList';

type Props = {
  tweets:Tweets;
};

const Page = ({ tweets }: Props) => {
  return (
    <Layout
      title="La communauté JavaScript du Nord"
      description="ChtiJS est un groupe de développeurs JavaScript passionnés qui échangent régulièrement découvertes et bonnes pratiques autour d'une bière dans une ambiance décontractée."
    >
      <ContentBlock>
        <Heading1>ChtiJS</Heading1>
        <Paragraph>
          <Strong>
            Bienvenue sur le site de la Communauté des développeurs JavaScript
            du Nord Pas-de-Calais.
          </Strong>
        </Paragraph>
        <Paragraph>
          ChtiJS est une réunion informelle de personnes passionnées de
          JavaScript. Notre but est de favoriser les échanges et la découverte
          dans une atmosphère ouverte et détendue.
        </Paragraph>
        <Paragraph>
          <Strong>Prochaine rencontre : </Strong>
          Pour rester informé des rencontres ChtiJS, trois options (cumulables
          😉) :
        </Paragraph>
        <UnorderedList>
          <ListItem>
            Le{' '}
            <Anchor href="http://www.meetup.com/FranceJS/">
              groupe Meetup de FranceJS
            </Anchor>{' '}
            ;
          </ListItem>
          <ListItem>
            Le{' '}
            <Anchor href="https://groups.google.com/g/chtijs">
              groupe Google
            </Anchor>{' '}
            de ChtiJS (plus axé proposition de conférences et préparatifs) ;
          </ListItem>
          <ListItem>
            Le compte{' '}
            <Anchor href="https://twitter.com/chtijs">Twitter de ChtiJS</Anchor>{' '}
            ;
          </ListItem>
        </UnorderedList>
        <Heading2>Concept</Heading2>
        <Paragraph>
          JavaScript est un langage de programmation incontournable pour la
          création de sites web. Il est également de plus en plus utilisé dans
          des domaines aussi divers que la robotique, l&apos;électronique, les
          bases de données ou encore les services web.
        </Paragraph>
        <Paragraph>
          Pour rester informés des récentes évolutions du langage, de ses outils
          et de ses champs dl&apos;application, nous nous réunissons dans une
          ambiance détendue et un esprit de partage.
        </Paragraph>
        <Paragraph>
          La communauté ChtiJS est ouverte à toutes les bonnes volontés,
          débutants ou experts.
        </Paragraph>
        <Paragraph>
          Vous souhaitez partager votre expérience ou vos débuts avec JavaScript
          ? ChtiJS est fait pour ça !
        </Paragraph>
        <Paragraph>
          Signalez vous sur Twitter auprès de{' '}
          <Anchor href="https://twitter.com/chtijs">@chtijs</Anchor>, ou
          inscrivez vous sur la{' '}
          <Anchor href="https://groups.google.com/g/chtijs">
            liste de diffusion
          </Anchor>{' '}
          et rejoignez nous sur{' '}
          <Anchor href="https://weblille.rocks/">slack</Anchor>.
        </Paragraph>
        <Heading2>Site web</Heading2>
        <Paragraph>
          Notre site web est aussi ouvert aux contributions, contenus comme
          code. Il vous suffit de faire un pull request sur{' '}
          <Anchor href="https://github.com/ChtiJS/chtijs.francejs.org">
            le dépôt GitHub
          </Anchor>
          . Vous pouvez retrouver les contributeurs du site{' '}
          <Anchor href="/credits/index.html">sur cette page</Anchor>.
        </Paragraph>
        <Heading2>FranceJS</Heading2>
        <Paragraph>
          ChtiJS fait partie de{' '}
          <Anchor href="http://francejs.org">l&apos;initiative FranceJS</Anchor>{' '}
          qui fédère les acteurs de JavaScript afin de promouvoir ce langage et
          de faciliter son développement en France.
        </Paragraph>
        <TweetList tweets={tweets}/>
      </ContentBlock>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = new Client(process.env.TWITTER_API_TOKEN as string);
  const userId = (await client.users.findUserByUsername('chtijs')).data?.id;
  const data = (await client.tweets.usersIdTweets(userId as string)).data;
  const tweets = data
    ?.map(({ id, text }) => {
      return {
        id,
        content: parseMarkdown(
          text
            .replace(/#([\w_]+)/mg, '[#$1](https://twitter.com/hashtag/$1)')
            .replace(/@([\w_]+)/mg, '[@$1](https://twitter.com/$1)')
        ) as MarkdownRootNode,
      };
    })
    .slice(0, 3);

  return { props: { tweets } as Props };
};
export default Page;