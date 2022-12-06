import { publicRuntimeConfig } from '../utils/config';
import {
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_L,
} from '../utils/constants';
import type { MarkdownImageNode } from '../utils/markdown';

const Img = ({
  imageNode,
  shape,
  position,
}: {
  imageNode: MarkdownImageNode;
  shape: 'square' | 'horizontalRectangle' | 'verticalRectangle' | '';
  position: 'left' | 'right' | '';
}) => {
  const finalTitle = imageNode.title || '';

  return (
    <>
      <img
        src={
          imageNode.url.startsWith('http')
            ? imageNode.url
            : publicRuntimeConfig.baseURL +
              publicRuntimeConfig.buildPrefix +
              '/' +
              imageNode.url
        }
        alt={imageNode.alt}
        className={''.concat(shape ? shape : '', position ? position : '')}
        {...(finalTitle ? { title: finalTitle } : {})}
      />
      <style jsx>{`
        img {
          clear: both;
          display: block;
          width: 100%;
          max-width: 100%;
        }
        img.square {
        }
        img.horizontalRectangle {
        }
        img.verticalRectangle {
        }

        @media screen and (min-width: ${CSS_BREAKPOINT_START_M}) {
          img.left,
          img.right {
            width: var(--block);
          }
          img.left {
            float: left;
            margin-right: var(--gutter);
          }
          img.right {
            float: right;
            margin-left: var(--gutter);
          }
          img.square {
            float: right;
          }
        }

        @media screen and (min-width: ${CSS_BREAKPOINT_START_L}) {
          img.left,
          img.right {
            width: calc(calc(var(--column) * 4) + calc(var(--gutter) * 3));
          }
        }
      `}</style>
    </>
  );
};

export default Img;
