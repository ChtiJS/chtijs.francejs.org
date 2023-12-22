'use client';
import { useState } from 'react';
import styles from './gallery.module.scss';
import { publicRuntimeConfig } from '../utils/config';
import type { MarkdownImageNode } from '../utils/markdown';
const Gallery = ({ imagesNodes }: { imagesNodes: MarkdownImageNode[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.root}>
      <p>
        <img
          src={
            imagesNodes[selectedIndex].url.startsWith('http')
              ? imagesNodes[selectedIndex].url
              : publicRuntimeConfig.baseURL +
                publicRuntimeConfig.basePath +
                '/' +
                imagesNodes[selectedIndex].url
          }
          alt={imagesNodes[selectedIndex].alt || 'Image'}
        />
      </p>
      <ul>
        {imagesNodes.map((imageNode, index) => (
          <li key={index}>
            <a
              onClick={() => setSelectedIndex(index)}
              aria-label={`Image ${index + 1}`}
              tabIndex={0}
            >
              <img
                src={
                  imageNode.url.startsWith('http')
                    ? imageNode.url
                    : publicRuntimeConfig.baseURL +
                      publicRuntimeConfig.basePath +
                      '/' +
                      imageNode.url
                }
                alt={imageNode.alt || `Image ${index + 1}`}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Gallery;
