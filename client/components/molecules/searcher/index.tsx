import { useCallback, useEffect, useRef, useState } from 'react';

import List from './list';

import { SearchSvg } from '../../../public/svgs/index';
import { filterByKey, formatValuesObject } from 'utils';
import { getSearcherData } from './utils';
import { props, SearchData } from './types';
import { useFriends } from 'setup/reducers/friendsReducer';
import { useUser } from 'setup/reducers/userReducer';
import { useDidMount, useOutsideClick } from 'hooks';
import styles from './searcher.module.scss';

const Searcher = ({ open, onClose }: props) => {
  const [searchData, setSearcherData] = useState<SearchData>({
    routes: { data: [] },
    conversations: { data: [] },
  });
  const [inputValue, setValueInput] = useState('');

  const templateRef = useRef<HTMLDivElement>(null);

  const user = useUser();
  const friends = useFriends();

  useDidMount(() => {
    const fetchedSearchData = getSearcherData(formatedConversations);

    setSearcherData(fetchedSearchData);
  });

  useOutsideClick(
    templateRef,
    () => {
      onClose();
      setValueInput('');
    },
    (target, defaultOption) => defaultOption && target.id !== 'searcher',
    { isListeningForEvent: open },
  );

  useEffect(() => {
    if (inputValue.length) {
      const { routes, conversations } = getSearcherData(formatedConversations);

      const filteredRoutes = filterByKey(routes.data, inputValue, 'filterValue');

      const filteredConversations = conversations.data.filter((conversation) => {
        const { fullname } = conversation.user;
        const formatedConversations = formatValuesObject(fullname);

        if (formatedConversations.toLowerCase().startsWith(inputValue.toLowerCase())) {
          return conversation;
        }
      });

      setSearcherData({
        routes: { data: filteredRoutes },
        conversations: { data: filteredConversations },
      });
    } else {
      const fetchData = getSearcherData(formatedConversations);

      setSearcherData(fetchData);
    }
  }, [inputValue]);

  const { conversations = [] } = user || {};

  const formatedConversations = conversations.map((conversation) => {
    const friend = friends.find((friend) => friend.email === conversation.with);

    if (friend) {
      return { user: friend, ...conversation };
    }
  });

  const handleOnSelect = useCallback(() => {
    onClose();
    setValueInput('');
  }, []);

  if (open) {
    return (
      <div className={styles.template} ref={templateRef}>
        <div className={styles.box}>
          <div className={styles.inputTemplate}>
            <div>
              <SearchSvg />
            </div>
            <div>
              <input
                value={inputValue}
                onChange={(e) => {
                  setValueInput(e.target.value);
                }}
                type="text"
                placeholder="What are you looking for?..."
              />
            </div>
          </div>
          <List data={searchData} inputValue={inputValue} onSelect={handleOnSelect} />
        </div>
      </div>
    );
  }

  return null;
};

export { Searcher };
