'use client';

import { type ReactNode, createContext } from 'react';
import useCSSVar from '../hooks/useCSSVar';
import styles from './grid.module.scss';

const DEFAULT_GRID_H = parseFloat(styles.hGrid.replace('rem', ''));
const DEFAULT_GRID_V = parseFloat(styles.vGrid.replace('rem', ''));
const DEFAULT_V_RHYTHM_RATIO = parseFloat(styles.vRhythmRatio);
const DEFAULT_COLUMN_RATIO = parseFloat(styles.columnRatio);
const DEFAULT_GUTTER_RATIO = parseFloat(styles.gutterRatio);

export const GridContext = createContext({
  vGrid: DEFAULT_GRID_H,
  hGrid: DEFAULT_GRID_V,
  vRhythmRatio: DEFAULT_V_RHYTHM_RATIO,
  columnRatio: DEFAULT_COLUMN_RATIO,
  gutterRatio: DEFAULT_GUTTER_RATIO,
});

export default function ProvideGridContext({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const vGrid = useCSSVar('number', '--vGrid', DEFAULT_GRID_V);
  const hGrid = useCSSVar('number', '--hGrid', DEFAULT_GRID_H);
  const vRhythmRatio = useCSSVar(
    'number',
    '--vRhythmRatio',
    DEFAULT_V_RHYTHM_RATIO
  );
  const gutterRatio = useCSSVar(
    'number',
    '--gutterRatio',
    DEFAULT_COLUMN_RATIO
  );
  const columnRatio = useCSSVar(
    'number',
    '--columnRatio',
    DEFAULT_GUTTER_RATIO
  );

  return (
    <GridContext.Provider
      value={{
        vGrid,
        hGrid,
        vRhythmRatio,
        gutterRatio,
        columnRatio,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}
