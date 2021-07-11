import RenderElements from './renderElements';

import { props } from './types';
import styles from './list.module.scss';

const List = ({ data, inputValue, onSelect }: props) => (
  <div className={styles.list}>
    {inputValue.length ? (
      <RenderElements
        data={data}
        onSelect={onSelect}
        notFound={() => <p className={styles.info}>Not found</p>}
      />
    ) : (
      <p className={styles.info}>I will find what you need for you.</p>
    )}
  </div>
);

export default List;
