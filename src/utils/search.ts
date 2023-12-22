import { writeFile } from 'fs';
import { promisify } from 'util';
import { join as joinPath } from 'path';
import lunr from 'lunr';
import { collectMarkdownText } from './markdown';
import type { BaseProps } from '../app/conferences/page';

const doWriteFile = promisify(writeFile);

const PROJECT_DIR = joinPath('.');

export async function buildSearchIndex(props: BaseProps) {
  const idx = lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('description');
    this.field('contents');

    props.entries.forEach((doc) => {
      this.add({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        contents: collectMarkdownText(doc.content),
      });
    }, this);
  });

  await doWriteFile(
    joinPath(PROJECT_DIR, 'public', 'conferencesSearchIndex.json'),
    JSON.stringify({
      index: idx,
      metadata: props.entries.reduce(
        (allMetadata, entry) => ({
          ...allMetadata,
          [entry.id]: {
            title: entry.title,
            description: entry.description,
          },
        }),
        {}
      ),
    })
  );
}
