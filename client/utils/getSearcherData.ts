import { DetailedConversation } from '../interfaces';

export const getSearcherData = (conversations: DetailedConversation[]) => {
  const routes = [
    { filterValue: 'contacts', value: '/contacts', href: '/contacts' },
    { filterValue: 'invites', value: '/invites', href: '/invites' },
    {
      filterValue: 'settings',
      value: [
        '/settings/profile',
        '/settings/members',
        '/settings/manageLists',
        '/settings/blocklist',
        '/settings/general',
        '/settings/numbers',
      ],
    },
  ];

  return {
    routes: {
      data: routes,
    },
    conversations: {
      data: conversations,
    },
  };
};
