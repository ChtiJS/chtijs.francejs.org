export type FeedDescription = {
  sourceURL: string;
  title: string;
  description: string;
  url: string;
  updatedAt: string;
  builtAt: string;
};

export type FeedItem = {
  title: string;
  description: string;
  url: string;
  author: { name: string };
  updatedAt: string;
  publishedAt: string;
};

export async function generateAtomFeed(
  informations: FeedDescription,
  items: FeedItem[]
) {
  return `<?xml version="1.0" encoding="utf-8"?>

<feed xmlns="http://www.w3.org/2005/Atom">    
  <id>${xmlEscape(informations.sourceURL)}</id>
  <title>${xmlEscape(informations.title)}</title>
  <subtitle>${xmlEscape(informations.description)}</subtitle>
  <link href="${xmlEscape(
    informations.url
  )}" rel="self" type="application/atom+xml" />
  <link href="${xmlEscape(
    informations.sourceURL
  )}" rel="alternate" type="text/html" />
  <updated>${xmlEscape(informations.updatedAt)}</updated>${items
    .map(
      (item) => `
  <entry>
    <id>${xmlEscape(item.url)}</id>
    <title>${xmlEscape(item.title)}</title>
    <link href="${xmlEscape(item.url)}" rel="alternate" type="text/html" />
    <updated>${xmlEscape(item.updatedAt)}</updated>
    <published>${xmlEscape(item.publishedAt)}</published>
    <summary>${xmlEscape(item.description)}</summary>
    <author>
      <name>${xmlEscape(item.author.name)}</name>
    </author>
  </entry>`
    )
    .join('')}
</feed>
`;
}

export async function generateRSSFeed(
  informations: FeedDescription,
  items: FeedItem[]
) {
  return `<?xml version="1.0" encoding="UTF-8" ?>

<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(informations.title)}</title>
    <description>${xmlEscape(informations.description)}</description>
    <link>${xmlEscape(informations.sourceURL)}</link>
    <atom:link href="${xmlEscape(
      informations.url
    )}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${xmlEscape(
      new Date(informations.updatedAt).toUTCString()
    )}</lastBuildDate>
    <pubDate>${xmlEscape(
      new Date(informations.builtAt).toUTCString()
    )}</pubDate>
    <ttl>1800</ttl>${items
      .map(
        (item) => `
      <item>
        <guid isPermaLink="true">${xmlEscape(item.url)}</guid>
        <title>${xmlEscape(item.title)}</title>
        <description>${xmlEscape(item.description)}</description>
        <link>${xmlEscape(item.url)}</link>
        <pubDate>${xmlEscape(
          new Date(item.publishedAt).toUTCString()
        )}</pubDate>
      </item>`
      )
      .join('')}
  </channel>
</rss>`;
}

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
