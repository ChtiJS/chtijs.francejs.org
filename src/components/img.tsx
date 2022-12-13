import {
  CSS_BREAKPOINT_START_M,
  CSS_BREAKPOINT_START_L,
} from '../utils/constants';
import ExportedImage, { ExportedImageProps } from 'next-image-export-optimizer';

const Img = ({
  shape = 'landscape',
  position = '',
  ...props
}: {
  shape: 'square' | 'landscape' | 'portrait';
  position: 'left' | 'right' | '';
} & Omit<ExportedImageProps, 'width' | 'height'>) => {
  return (
    <>
      <ExportedImage
        width={shape === 'portrait' ? 768 : shape === 'square' ? 500 : 1024}
        height={shape === 'portrait' ? 1024 : shape === 'square' ? 500 : 768}
        className={`${position ? position + ' ' : ''}${props.className || ''}`}
        {...props}
      />
      <style jsx>{`
        img {
          clear: both;
          display: block;
          width: 100%;
          max-width: 100%;
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
