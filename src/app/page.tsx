import ContentBlock from '../components/contentBlock';
import Heading1 from '../components/h1';
import Heading2 from '../components/h2';
import Paragraph from '../components/p';
import Strong from '../components/strong';
import Anchor from '../components/a';
import UnorderedList from '../components/ul';
import ListItem from '../components/li';
import { parseMarkdown } from '../utils/markdown';
import TootList from '../components/tootList';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import buildMetadata from '../utils/metadata';
import { MASTODON_ACCOUNT_ID, MASTODON_SERVER } from '../utils/constants';
import type { MarkdownRootNode } from '../utils/markdown';
import type { Toots } from '../components/tootList';

export async function generateMetadata() {
  return buildMetadata({
    pathname: '/',
    title: 'La communauté JavaScript du Nord',
    description:
      "ChtiJS est un groupe de développeurs JavaScript passionnés qui échangent régulièrement découvertes et bonnes pratiques autour d'une bière dans une ambiance décontractée.",
  });
}

const htmlToMarkdown = new NodeHtmlMarkdown({});

export default async function Page() {
  const body = (await (
    await fetch(
      `https://${MASTODON_SERVER}/api/v1/accounts/${MASTODON_ACCOUNT_ID}/statuses`,
      {
        headers: new Headers({
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
        }),
        mode: 'cors',
        cache: 'default',
      }
    )
  ).json()) as Status[];
  const toots = body
    .filter((toot) => !toot.in_reply_to_id)
    .filter((toot) => toot.content)
    .map((toot) => {
      const text = parseMarkdown(
        htmlToMarkdown.translate(toot.content)
      ) as MarkdownRootNode;

      return {
        id: toot.id,
        createdAt: toot.created_at,
        text,
        url: toot.url,
      };
    })
    .slice(0, 3) as Toots;

  return (
    <ContentBlock>
      <Heading1>ChtiJS</Heading1>
      <Paragraph>
        <Strong>
          Bienvenue sur le site de la Communauté des développeurs JavaScript du
          Nord Pas-de-Calais.
        </Strong>
      </Paragraph>
      <Paragraph>
        ChtiJS est une réunion informelle de personnes passionnées de
        JavaScript. Notre but est de favoriser les échanges et la découverte
        dans une atmosphère ouverte et détendue.
      </Paragraph>
      <Paragraph>
        <Strong>Prochaine rencontre : </Strong>
        Pour rester informé des rencontres ChtiJS, quatre options (cumulables
        😉) :
      </Paragraph>
      <UnorderedList>
        <ListItem>
          Le{' '}
          <Anchor
            href="http://www.meetup.com/FranceJS/"
            title="Rejoindre notre groupe Meetup"
          >
            groupe Meetup de FranceJS
          </Anchor>{' '}
          ;
        </ListItem>
        <ListItem>
          Le{' '}
          <Anchor
            href="https://groups.google.com/g/chtijs"
            title="Visiter notre groupe Google"
          >
            groupe Google
          </Anchor>{' '}
          de ChtiJS (plus axé proposition de conférences et préparatifs) ;
        </ListItem>
        <ListItem>
          Le compte{' '}
          <Anchor
            href="https://twitter.com/chtijs"
            title="Voir notre compte Twitter"
          >
            Twitter de ChtiJS
          </Anchor>{' '}
          ;
        </ListItem>
        <ListItem>
          Le compte{' '}
          <Anchor
            href="https://mastodon.social/@chtijs@piaille.fr"
            title="Voir notre compte Mastodon"
          >
            Mastodon de ChtiJS
          </Anchor>{' '}
          ;
        </ListItem>
      </UnorderedList>
      <Heading2>Concept</Heading2>
      <Paragraph>
        JavaScript est un langage de programmation incontournable pour la
        création de sites web. Il est également de plus en plus utilisé dans des
        domaines aussi divers que la robotique, l&apos;électronique, les bases
        de données ou encore les services web.
      </Paragraph>
      <Paragraph>
        Pour rester informés des récentes évolutions du langage, de ses outils
        et de ses champs dl&apos;application, nous nous réunissons dans une
        ambiance détendue et un esprit de partage.
      </Paragraph>
      <Paragraph>
        La communauté ChtiJS est ouverte à toutes les bonnes volontés, débutants
        ou experts.
      </Paragraph>
      <Paragraph>
        Vous souhaitez partager votre expérience ou vos débuts avec JavaScript ?
        ChtiJS est fait pour ça !
      </Paragraph>
      <Paragraph>
        Signalez vous sur Twitter auprès de{' '}
        <Anchor
          href="https://twitter.com/chtijs"
          title="Nous suivre sur Twitter"
        >
          @chtijs
        </Anchor>
        , ou inscrivez vous sur la{' '}
        <Anchor
          href="https://groups.google.com/g/chtijs"
          title="S'abonner à notre liste de diffusion"
        >
          liste de diffusion
        </Anchor>{' '}
        et rejoignez nous sur{' '}
        <Anchor href="https://weblille.rocks/" title="Rejoindre notre Slack">
          slack
        </Anchor>
        .
      </Paragraph>
      <Heading2>Site web</Heading2>
      <Paragraph>
        Notre site web est aussi ouvert aux contributions, contenus comme code.
        Il vous suffit de faire un pull request sur{' '}
        <Anchor
          href="https://github.com/ChtiJS/chtijs.francejs.org"
          title="Voir notre depôt Git"
        >
          le dépôt GitHub
        </Anchor>
        . Vous pouvez retrouver les contributeurs du site{' '}
        <Anchor href="/credits/index.html" title="Voir nos contributeur/rices">
          sur cette page
        </Anchor>
        .
      </Paragraph>
      <Heading2>FranceJS</Heading2>
      <Paragraph>
        ChtiJS fait partie de{' '}
        <Anchor href="http://francejs.org" title="Visite le site de FranceJS">
          l&apos;initiative FranceJS
        </Anchor>{' '}
        qui fédère les acteurs de JavaScript afin de promouvoir ce langage et de
        faciliter son développement en France.
      </Paragraph>
      <TootList toots={toots} />
    </ContentBlock>
  );
}

type Status = NonNullable<{
  id: NonNullable<string>;
  uri: NonNullable<string>;
  created_at: NonNullable<string>;
  account: Account;
  content: NonNullable<string>;
  visibility: 'public' | 'unlisted' | 'private' | 'direct';
  sensitive: NonNullable<boolean>;
  spoiler_text: NonNullable<string>;
  media_attachements: NonNullable<Attachment[]>;
  application: Application;
  url?: NonNullable<string>;
  in_reply_to_id?: NonNullable<string>;
  in_reply_to_account_id?: NonNullable<string>;
  reblog?: Status;
  poll?: Poll;
  card?: Card;
  language?: NonNullable<string>;
  text?: NonNullable<string>;
  mentions: NonNullable<Mention[]>;
  tags: NonNullable<Tag[]>;
  emojis: NonNullable<Emoji[]>;
  reblogs_count: NonNullable<number>;
  favourites_count: NonNullable<number>;
  replies_count: NonNullable<number>;
  favourited?: NonNullable<boolean>;
  reblogged?: NonNullable<boolean>;
  muted?: NonNullable<string>;
  bookmarked?: NonNullable<string>;
  pinned?: NonNullable<string>;
}>;
type Field = NonNullable<{
  name: NonNullable<string>;
  value: NonNullable<string>;
  verified_at?: NonNullable<string>;
}>;
type Emoji = NonNullable<{
  shortcode: NonNullable<string>;
  url: NonNullable<string>;
  static_url: NonNullable<string>;
  visible_in_picker: NonNullable<boolean>;
  category?: NonNullable<string>;
}>;
type Attachment = NonNullable<{
  id: NonNullable<string>;
  url: NonNullable<string>;
  preview_url: NonNullable<string>;
  remote_url?: NonNullable<string>;
  description?: NonNullable<string>;
  blurhash?: NonNullable<string>;
}>;
type Poll = NonNullable<{
  id: NonNullable<string>;
  expires_at?: NonNullable<string>;
  expired: NonNullable<boolean>;
  multiple: NonNullable<boolean>;
  votes_count: NonNullable<number>;
  voters_count?: NonNullable<number>;
  voted?: NonNullable<boolean>;
  own_votes?: NonNullable<NonNullable<number>[]>;
  options: NonNullable<
    NonNullable<{
      title: NonNullable<string>;
      votes_count?: NonNullable<number>;
    }>[]
  >;
  emojis: NonNullable<Emoji[]>;
}>;
type Card = NonNullable<{
  url: NonNullable<string>;
  title: NonNullable<string>;
  description: NonNullable<string>;
  type: 'link' | 'photo' | 'video' | 'rich';
  author_name?: NonNullable<string>;
  author_url?: NonNullable<string>;
  provider_name?: NonNullable<string>;
  provider_url?: NonNullable<string>;
  html?: NonNullable<string>;
  width?: NonNullable<number>;
  height?: NonNullable<number>;
  image?: NonNullable<string>;
  embed_url?: NonNullable<string>;
  blurhash?: NonNullable<string>;
}>;
type Mention = NonNullable<{
  id: NonNullable<string>;
  username: NonNullable<string>;
  acct: NonNullable<string>;
  url: NonNullable<string>;
}>;
type Tag = NonNullable<{
  name: NonNullable<string>;
  url: NonNullable<string>;
  history?: NonNullable<History[]>;
}>;
type History = NonNullable<{
  day: NonNullable<string>;
  uses: NonNullable<string>;
  accounts: NonNullable<string>;
}>;
type Account = NonNullable<{
  id: NonNullable<string>;
  username: NonNullable<string>;
  acct: NonNullable<string>;
  url: NonNullable<string>;
  moved?: Account;
  fields?: Field;
  bot?: NonNullable<boolean>;
  suspended?: NonNullable<boolean>;
  mute_expires_at?: NonNullable<string>;
  created_at: NonNullable<string>;
  last_status_at?: NonNullable<string>;
  statuses_count: NonNullable<number>;
  followers_count: NonNullable<number>;
  following_count: NonNullable<number>;
  display_name: NonNullable<string>;
  note: NonNullable<string>;
  avatar: NonNullable<string>;
  avatar_static: NonNullable<string>;
  header: NonNullable<string>;
  header_static: NonNullable<string>;
  locked: NonNullable<boolean>;
  emojis: NonNullable<Emoji[]>;
  discoverable: NonNullable<string>;
}>;
type Application = NonNullable<{
  name: NonNullable<string>;
  website?: NonNullable<string>;
  vapid_key?: NonNullable<string>;
}>;
