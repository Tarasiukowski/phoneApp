import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { ImageUser } from '../../atoms';

import styles from './searcher.module.scss';
import { SearchSvg } from '../../../public/svgs/index';
import { getAllChildreenOfElement, getSearcherData } from '../../../utils';
import { props, SearchData } from './types';
import { selectFriends } from '../../../reducers/friendsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { DetailedConversation } from '../../../interfaces';

const Searcher = ({ open, onClose }: props) => {
  const [searchData, setSearcherData] = useState<SearchData>({
    routes: { data: [] },
    conversations: { data: [] },
  });
  const [inputValue, setValueInput] = useState('');

  const templateRef = useRef<HTMLDivElement>(null);

  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const formatedConversations = user.conversations.map((conversation) => {
    const friend = friends.find((friend) => friend.email === conversation.with);

    return { user: friend, ...conversation };
  }) as DetailedConversation[];

  useEffect(() => {
    const handleClickEvent = (e: Event) => {
      const templateRefCurrent = templateRef.current as HTMLElement;
      const allowElements = templateRef.current ? getAllChildreenOfElement(templateRefCurrent) : [];
      const target = e.target as HTMLElement;

      target.id === 'searcher' ? allowElements.push(target) : null;

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

  const handleClickElement = () => {
    onClose();
    setValueInput('');
  };

  if (open) {
    const { conversations, routes } = searchData;

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
          <div className={styles.lists}>
            {inputValue.length ? (
              <>
                {conversations.data.length || routes.data.length ? (
                  <>
                    {(() => {
                      const elems: JSX.Element[] = [];

                      let key: keyof SearchData;

                      for (key in searchData) {
                        const dataOfKey = searchData[key].data as any[];

                        dataOfKey.map((elem) => {
                          if (key === 'conversations') {
                            const {
                              user: {
                                fullname: { firstname, lastname },
                              },
                              id,
                            } = elem;

                            elems.push(
                              <Link
                                href={`/inbox/${id}`}
                                key={id}
                                children={
                                  <div onClick={handleClickElement} className={styles.elementList}>
                                    <ImageUser member={elem.user} />
                                    <p style={{ marginLeft: '10px' }}>
                                      {firstname} {lastname}
                                    </p>
                                  </div>
                                }
                              />,
                            );
                          } else {
                            const { value } = elem;

                            if (typeof value === 'string') {
                              elems.push(
                                <Link
                                  href={`${value}`}
                                  key={value}
                                  children={
                                    <div
                                      onClick={handleClickElement}
                                      className={styles.elementList}
                                    >
                                      <p>{value}</p>
                                    </div>
                                  }
                                />,
                              );
                            } else {
                              value.map((val: string) => {
                                elems.push(
                                  <Link
                                    href={`${val}`}
                                    key={val}
                                    children={
                                      <div
                                        onClick={handleClickElement}
                                        className={styles.elementList}
                                      >
                                        <p>{val}</p>
                                      </div>
                                    }
                                  />,
                                );
                              });
                            }
                          }
                        });
                      }

                      return elems;
                    })()}
                  </>
                ) : (
                  <p className={styles.info}>Not found</p>
                )}
              </>
            ) : (
              <p className={styles.info}>I will find what you need for you.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Searcher;
