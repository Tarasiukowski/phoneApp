import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Chat, UserDetailed } from '../../molecules';
import Navigation from './navigation';

import { selectFriends } from '../../../reducers/friendsReducer';
import { ChatData } from './types';
import { User } from '../../../interfaces';
import { fetcher } from '../../../utils';

const GroupContent = () => {
  const [dataChat, setDataChat] = useState<ChatData>({ user: null, messages: [] });

  const friends = useSelector(selectFriends);

  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const conversationId = slug[2];

  const fetchDataChat = async (url: string) => {
    const { conversation } = await fetcher('POST', url, {
      id: conversationId,
    });
    const { email, messages } = conversation;

    const friend = friends.find((friend) => {
      if (friend.email === email) {
        return friend;
      }
    }) as User;

    setDataChat({ messages, user: friend });
  };

  fetchDataChat('/conversation');

  const { user: member } = dataChat;

  return (
    <>
      <Navigation />
      <Chat {...dataChat} id={conversationId} width="42.1vw" />
      <UserDetailed loading={!member} {...member} />
    </>
  );
};

export { GroupContent };
