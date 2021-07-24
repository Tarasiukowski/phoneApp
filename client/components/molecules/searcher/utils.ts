import { DetailedConversation } from 'interfaces';
import { SearchType } from 'components/molecules/searcher/types';
import { paths } from '../../../constants';

type Route = {
  type: SearchType.route;
  filterValue: string;
  href?: string;
  hrefs?: string[];
};

export const getSearcherData = (conversations: (DetailedConversation | undefined)[]) => {
  const routes: Route[] = [
    { type: SearchType.route, filterValue: 'contacts', href: paths.contacts },
    { type: SearchType.route, filterValue: 'invites', href: paths.invites },
    {
      type: SearchType.route,
      filterValue: 'settings',
      hrefs: [
        paths.settings.profile,
        paths.settings.members,
        paths.settings.manageLists,
        paths.settings.blocklist,
        paths.settings.general,
        paths.settings.nummber,
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
