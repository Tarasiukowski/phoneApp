import { forwardRef } from 'react';

import { ImageUser } from 'components/atoms';

import { props } from './types';
import styles from './elementList.module.scss';

const ElementList = forwardRef<HTMLDivElement, props>(({ content, user, onClick }) => (
  <div className={styles.box} onClick={onClick}>
    {user && <ImageUser member={user} />}
    <p style={user && { marginLeft: '5px' }}>{content}</p>
  </div>
));

export default ElementList;
