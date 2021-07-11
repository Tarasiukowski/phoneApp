import { DetailedConversation } from 'interfaces';
import { SearchType } from 'components/molecules/searcher/types';

type Route = {
  type: SearchType.route;
  filterValue: string;
  href?: string;
  hrefs?: string[];
};

export const getSearcherData = (conversations: (DetailedConversation | undefined)[]) => {
  const routes: Route[] = [
    { type: SearchType.route, filterValue: 'contacts', href: '/contacts' },
    { type: SearchType.route, filterValue: 'invites', href: '/invites' },
    {
      type: SearchType.route,
      filterValue: 'settings',
      hrefs: [
        '/settings/profile',
        '/settings/members',
        '/settings/manageLists',
        '/settings/blocklist',
        '/settings/general',
        '/settings/number',
      ],
    },
  ];

  const filteredConversations = conversations.reduce(
    (out: (DetailedConversation & { type: SearchType.conversation })[], conversation) =>
      conversation ? out.concat({ type: SearchType.conversation, ...conversation }) : out,
    [],
  );
  return {
    routes: {
      data: routes,
    },
    conversations: {
      data: filteredConversations,
    },
  };
};
