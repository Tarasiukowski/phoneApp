import { props } from './types';
import { icons } from './data';
import styles from './list.module.scss';

const DetailedChatUserList = ({ data }: props) => {
  const formatedData = Object.entries(data);

  return (
    <div className={styles.list}>
      {formatedData.map((elem) => {
        const key = elem[0] as keyof props['data'];
        const value = elem[1];
        const Icon = icons[key];

        return (
          <div className={styles.listElement} key={key}>
            <div>
              <Icon />
              <p>{key}</p>
            </div>
            <div>
              <p>{value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailedChatUserList;
