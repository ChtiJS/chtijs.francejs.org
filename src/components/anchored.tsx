import Link from 'next/link';
import { publicRuntimeConfig } from '../utils/config';

const Anchored = ({
  children,
  id = '',
}: {
  children: React.ReactNode;
  id?: string;
}) => {
  return (
    <span className="root">
      {children}{' '}
      <small>
        <Link href={`#${id}`} legacyBehavior>
          <a className="icon" id={id} title="Lien vers cette section">
            <span>🔗</span>
          </a>
        </Link>
      </small>
      <style jsx>{`
        small {
          font-weight: bold;
        }
        a.icon {
          display: none;
          width: var(--column);
          height: var(--vRythm);
          background: var(--tertiary);
          mask-repeat: no-repeat;
          mask-position: left center;
          -webkit-mask-size: calc(var(--vRythm) * 1);
          mask-size: calc(var(--vRythm) * 1);
        }
        .root:hover a.icon {
          display: inline-block;
          mask-image: url('${publicRuntimeConfig.buildPrefix}/images/icons/link.svg');
        }
        a.icon:target {
          display: inline-block;
          mask-image: url('${publicRuntimeConfig.buildPrefix}/images/icons/target.svg');
        }
        a.icon span {
          display: none;
        }
      `}</style>
    </span>
  );
};

export default Anchored;
