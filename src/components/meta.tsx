import Head from "next/head";
import { useRouter } from "next/router";
// import { darkBackground } from "../styles";
import { publicRuntimeConfig } from "../utils/config";
import {
  ORGANISATION_NAME,
  ORGANISATION_PRIMARY_COLOR,
  TWITTER_ACCOUNT,
} from "../utils/constants";

type Props = {
  name: string;
  title: string;
  description: string;
  image: string;
};

export default function Meta({ name, title, description, image }: Props) {
  const router = useRouter();
  const fullTitle = `${title ? `${title} - ` : ""}${name}`;
  const canonicalURL =
    publicRuntimeConfig.baseURL +
    publicRuntimeConfig.buildPrefix +
    router?.asPath;
  const imageURL =
    typeof image === "string" && image && /^https?:\/\//.test(image)
      ? image
      : image
      ? publicRuntimeConfig.baseURL +
        publicRuntimeConfig.buildPrefix +
        (image.startsWith("/") ? "" : "/") +
        image
      : publicRuntimeConfig.baseURL +
        publicRuntimeConfig.buildPrefix +
        "/images/banner.png";

  return (
    <Head>
      <meta charSet="utf-8" />

      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content={ORGANISATION_PRIMARY_COLOR} />
      <link rel="canonical" href={canonicalURL} />
      <meta name="author" content={ORGANISATION_NAME} />
      <link
        rel="icon"
        type="image/svg+xml"
        href={publicRuntimeConfig.buildPrefix + "/images/favicon.svg"}
        sizes="any"
      />
      <link
        rel="icon"
        type="image/png"
        href={publicRuntimeConfig.buildPrefix + "/images/favicon-16.png"}
        sizes="16x16"
      />
      <link
        rel="icon shortcut"
        type="image/png"
        href={publicRuntimeConfig.buildPrefix + "/images/favicon-128.png"}
        sizes="128x128"
      />
      <meta name="robots" content="index,follow" />

      {/* Tech tags */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content="fr_FR" />
      <meta
        property="og:type"
        content={router?.pathname === "/actualite" ? "article" : "website"}
      />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      {imageURL ? <meta property="og:image" content={imageURL} /> : null}

      {/* Twitter */}
      {imageURL ? (
        <meta property="twitter:card" content="summary_large_image" />
      ) : (
        <meta name="twitter:card" content="summary" />
      )}
      <meta name="twitter:site" content={`@${TWITTER_ACCOUNT}`} />
      <meta name="twitter:creator" content={`@${TWITTER_ACCOUNT}`} />
      <meta property="twitter:url" content={canonicalURL} />
      {imageURL ? <meta property="twitter:image" content={imageURL} /> : null}
    </Head>
  );
}
