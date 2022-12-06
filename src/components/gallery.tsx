import { useState } from 'react';
import { CSS_BREAKPOINT_END_M } from '../utils/constants';
import { publicRuntimeConfig } from '../utils/config';
import type { MarkdownImageNode } from '../utils/markdown';

const Gallery = ({ imagesNodes }: { imagesNodes: MarkdownImageNode[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="root">
      <p>
        <img
          src={
            imagesNodes[selectedIndex].url.startsWith('http')
              ? imagesNodes[selectedIndex].url
              : publicRuntimeConfig.baseURL +
                publicRuntimeConfig.buildPrefix +
                '/' +
                imagesNodes[selectedIndex].url
          }
          alt={imagesNodes[selectedIndex].alt || ''}
        />
      </p>
      <ul>
        {imagesNodes.map((imageNode, index) => (
          <li key={index}>
            <a onClick={setSelectedIndex.bind(null, index)}>
              <img
                src={
                  imageNode.url.startsWith('http')
                    ? imageNode.url
                    : publicRuntimeConfig.baseURL +
                      publicRuntimeConfig.buildPrefix +
                      '/' +
                      imageNode.url
                }
                alt={imageNode.alt || ''}
              />
            </a>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .root {
          clear: both;
          background: var(--secondary);
          padding: calc(var(--vRythm) / 2) calc(var(--gutter) / 2);
        }
        p {
          text-align: center;
          padding: calc(var(--vRythm) / 2) calc(var(--gutter) / 2);
          margin: 0;
          height: calc(var(--vRythm) * 22);
          background: var(--light);
        }
        p img {
          max-width: 100%;
          height: 100%;
          max-height: 100%;
        }
        ul {
          display: flex;
          justify-content: left;
          flex-wrap: wrap;
          margin: 0 0 0 calc(-0.5 * var(--gutter));
          padding: 0;
          overflow: hidden;
        }
        ul li {
          display: block;
          list-style-type: none;
          text-align: center;
          padding: calc(var(--vRythm) / 2) 0 0 calc(var(--gutter) / 2);
        }
        ul li a {
          display: block;
          height: calc(var(--vRythm) * 4);
          width: calc(var(--column) * 2);
          background: var(--light);
        }
        ul li img {
          max-width: 100%;
          max-height: 100%;
          height: 100%;
          cursor: pointer;
        }
        @media screen and (max-width: ${CSS_BREAKPOINT_END_M}) {
          p {
            height: calc(var(--vRythm) * 12);
          }
          ul li a {
            height: calc(var(--vRythm) * 2);
            width: calc(var(--column) * 1);
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
