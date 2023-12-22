import styles from "./_gridSystem.module.scss";

export default function GridSystem(): JSX.Element {
  return (
    <div className={styles.grid} id="gridSystem">
      <div className={styles.vGrid} id="vGridSystem">
        {new Array(30).fill("").map((_, index) => {
          return [
            <div key={`g${index}`} className={styles.gutter}></div>,
            <div key={`c${index}`} className={styles.column}></div>,
          ];
        })}
      </div>
      <div className={styles.hGrid} id="hGridSystem">
        {new Array(100).fill("").map((_, index) => {
          return [<div key={`${index}`} className={styles.row}></div>];
        })}
      </div>
    </div>
  );
}
