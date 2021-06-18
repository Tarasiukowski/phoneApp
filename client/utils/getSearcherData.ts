import { DetailedConversation } from '../interfaces';

export const getSearcherData = (conversations: DetailedConversation[]) => {
  const routes = [
    { filterValue: 'contacts', value: '/contacts', href: '/contacts' },
    { filterValue: 'invites', value: '/invites', href: '/invites' },
    {
      filterValue: 'settings',
      values: [
        '/settings/profile',
        '/settings/members',
        '/settings/manageLists',
        '/settings/blocklist',
        '/settings/general',
        '/settings/number',
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
