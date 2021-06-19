import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import List from './list';

import { SearchSvg } from '../../../public/svgs/index';
import { getAllChildreenOfElement, getSearcherData } from '../../../utils';
import { props, SearchData } from './types';
import { selectFriends } from '../../../reducers/friendsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { DetailedConversation } from '../../../interfaces';
import styles from './searcher.module.scss';

const Searcher = ({ open, onClose }: props) => {
  const [searchData, setSearcherData] = useState<SearchData>({
    routes: { data: [] },
    conversations: { data: [] },
  });
  const [inputValue, setValueInput] = useState('');

  const templateRef = useRef<HTMLDivElement>(null);

  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const conversations = user ? user.conversations : [];

  const formatedConversations = conversations.map((conversation) => {
    const friend = friends.find((friend) => friend.email === conversation.with);

    return { user: friend, ...conversation };
  }) as DetailedConversation[];

  useEffect(() => {
    const handleClickEvent = (e: Event) => {
      const templateRefCurrent = templateRef.current as HTMLElement;
      const allowElements = templateRef.current ? getAllChildreenOfElement(templateRefCurrent) : [];
      const target = e.target as HTMLElement;

      target.id === 'searcher' && allowElements.push(target);

      if (!allowElements.includes(target)) {
        onClose();
        setValueInput('');
      }
    };

    window.addEventListener('click', handleClickEvent);
  });

  useEffect(() => {
    const fetchedSearchData = getSearcherData(formatedConversations);

    setSearcherData(fetchedSearchData);
  }, []);

  useEffect(() => {
    if (inputValue.length) {
      const { routes, conversations } = getSearcherData(formatedConversations);

      const filteredRoutes = routes.data.filter((route) => {
        if (route.filterValue.toLowerCase().startsWith(inputValue.toLowerCase())) {
          return route;
        }
      });

      const filteredConversations = conversations.data.filter((conversation) => {
        const {
          user: {
            fullname: { firstname, lastname },
          },
        } = conversation;

        if (`${firstname} ${lastname}`.toLowerCase().startsWith(inputValue.toLowerCase())) {
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

  const handleOnSelect = () => {
    onClose();
    setValueInput('');
  };

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
