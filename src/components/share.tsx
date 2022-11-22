import Paragraph from "./p";
import Strong from "./strong";
import Anchor from "./a";
import { TWITTER_ACCOUNT } from "../utils/constants";
import { publicRuntimeConfig } from "../utils/config";

export default function Share({
  url,
  title,
}: {
  url: string;
  title: string;
}): JSX.Element {
  return (
    <Paragraph>
      <Strong>Commenter cet article&nbsp;:</Strong><br />
      <Anchor
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        title="Commenter sur Facebook"
        target="_blank"
      >
        <span className="icon facebook" />
        Facebook
      </Anchor>{" - "}
      <Anchor
        href={`https://twitter.com/intent/tweet/?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}&via=${TWITTER_ACCOUNT}`}
        title="Commenter sur Facebook"
        target="_blank"
      >
        <span className="icon twitter" />
        Twitter
      </Anchor>{" - "}
      <style jsx>{`
        span.icon {
          display: inline-block;
          height: var(--vRythm);
          width: calc(var(--vRythm) * 0.6);
          background: var(--dark);
          mask-repeat: no-repeat;
          mask-size: calc(var(--vRythm) * 0.6);
          -webkit-mask-size: calc(var(--vRythm) * 0.6);
          mask-position: left bottom;
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/twitter.svg");
        }
        span.icon.facebook {
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/facebook.svg");
        }
        span.icon.mail {
          mask-image: url("${publicRuntimeConfig.buildPrefix}/images/icons/mail.svg");
        }
      `}</style>
    </Paragraph>
  );
}