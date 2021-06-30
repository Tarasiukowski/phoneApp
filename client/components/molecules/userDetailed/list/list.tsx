import { props, ListElem } from './types'
import { icons } from './data'
import styles from './list.module.scss';

const DetailedChatUserList = ({ data }: props) => (
  <div className={styles.list}>
    {data.map((listElem, index) => {
      const keys = Object.keys(listElem);
      const key = keys[0] as keyof ListElem

      return (
        <div className={styles.listElement} key={index}>
          <div>
            {icons[key]()}
            <p>{key}</p>
          </div>
          <div>
            <p>{listElem[key]}</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default DetailedChatUserList;
